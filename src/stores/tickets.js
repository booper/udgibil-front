import { defineStore } from "pinia";
import { ref, computed, toValue, reactive } from "vue";
import { useGet, usePost } from "@/composibles/networks";
import { useUserStore } from "@/stores/user";
import { DateTime, Interval } from "luxon";

export const useTicketsStore = defineStore("tickets", () => {
  const tickets = ref([]);
  const ticket = ref(null);
  const ticketId = ref(null);
  const replies = ref([]);
  const userStore = useUserStore();

  function setTicket(tk) {
    ticket.value = tk;
  }

  function setReplies(rp) {
    replies.value = rp === null || rp === undefined ? [] : rp;
  }

  function setTicketId(tkId) {
    ticketId.value = tkId;
  }

  const loadTicketsList = computed(() => {
    return async () => {
      const reqGet = useGet();
      const urlTickets = ref("/tickets/all");
      await reqGet.request(urlTickets);
      const resGet = toValue(reqGet.res);

      setTickets(resGet.tickets);
    };
  });

  const loadTicket = computed(() => {
    return async () => {
      const reqGet = useGet();
      const urlTickets = ref("/tickets/id");
      const params = reactive({});
      params.id = ticketId.value;
      await reqGet.request(urlTickets, params);
      const resGet = toValue(reqGet.res);
      if (resGet.error === 0) {
        setTicket(resGet.ticket);
        setReplies(ticket.value.replies);
      } else {
        setTicket(null);
        setReplies(null);
      }
    };
  });

  async function createTicket(data) {
    const reqPost = usePost();
    const urlTickets = ref("/tickets/create");
    const postData = ref({
      title: data.subject,
      text: data.text,
      userPic: userStore.getUserPic,
    });
    await reqPost.request(urlTickets, postData);
    const resPost = toValue(reqPost.res);
    insertTicket(resPost.ticket);
  }

  function insertTicket(tk) {
    tickets.value.unshift(tk);
  }

  function setTickets(tk) {
    tickets.value = tk;
  }

  const getTicketsList = computed(() => {
    return tickets.value;
  });

  const getReplies = computed(() => {
    return replies.value;
  });

  const getTicket = computed(() => {
    return ticket.value;
  });

  async function addTicketReply(tk) {
    if (ticket.value.replies === null || ticket.value.replies === undefined) {
      ticket.value.replies = [];
    }

    if (
      ticket.value.replies !== null &&
      ticket.value.replies !== undefined &&
      ticket.value.replies.length !== 0
    ) {
      const lastReply = ticket.value.replies[ticket.value.replies.length - 1];
      const nowDateTime = DateTime.now();
      const lastReplyDateTime = DateTime.fromISO(lastReply.createdAt);
      const diff = Interval.fromDateTimes(lastReplyDateTime, nowDateTime);
      const diffMinutes = diff.length("minutes");
      if (diffMinutes < 3) {
        return false;
      }
    }

    tk.userPicture = userStore.getUserPic;
    tk.userName = userStore.getUserName;
    ticket.value.replies.push(tk);
    setReplies(ticket.value.replies);

    const reqPost = usePost();
    const urlTickets = ref("/tickets/add/reply");
    const postData = reactive({});
    postData.ticketId = tk.ticketId;
    postData.action = tk.action;
    postData.text = tk.text;
    postData.userPic = userStore.getUserPic;
    await reqPost.request(urlTickets, postData);
    return true;
  }

  return {
    tickets,
    loadTicketsList,
    getTicketsList,
    getTicket,
    loadTicket,
    getReplies,
    setTicketId,
    setTicket,
    setTickets,
    createTicket,
    insertTicket,
    addTicketReply,
    setReplies,
  };
});
