const { createApp } = Vue;

const object = {
    data: function () {
        return {

            // ARRAY UTENTI E CHAT
            contacts: [
                {
                    name: 'Michele',
                    avatar: 'img/avatar_1.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: 'img/avatar_2.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: 'img/avatar_3.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: 'img/avatar_4.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: 'img/avatar_5.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: 'img/avatar_6.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: 'img/avatar_7.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: '   img/avatar_8.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ],
            posizioneOggetto: 0,
            lastMex: [],
            lastData: [],
            lastDay: [],
            emptyChat: [],
            dataCorrente: "",
            oraCorrente: ""
        }
    },
    methods: {
        switchContact(index) {
            this.posizioneOggetto = index;
        },
        newMessage(index) {
            // recupero ora corrente
            this.now();
            // recupero valore input
            const text = document.getElementById("floatingInput").value;
            // creo oggetto messaggio
            const message = {
                date: this.dataCorrente,
                message: text,
                status: 'sent',
                time: this.oraCorrente
            };
            // controllo se l'ultimo messaggio nella chat è nullo
            if (this.contacts[index].messages[0].message == "") {
                // sostituisco al messaggio nullo il nuovo mex
                this.contacts[index].messages.splice(0, 1, message);
            }
            else {
                // pusho il mex nuovo
                this.contacts[index].messages.push(message);
            }
            // aggiorno la lista controllo dei messaggi nulli
            this.checkMex()
            // pulisco l'input
            document.getElementById("floatingInput").value = "";
            // recupero la data e l'ora dell'ultimo messaggio
            this.getLastMex()
            // calcolo la posizione dell'ultimo messaggio
            const lastPos = this.contacts[index].messages.length - 1;
            // sostituisco la data del nuovo messaggio per l'ultimo accesso
            this.lastData.splice(index,1,this.contacts[index].messages[lastPos].time);
            this.lastDay.splice(index,1,this.contacts[index].messages[lastPos].date.substr(0, 10));
            // creo timer e genero la risposta al messaggio
            setTimeout(() => {
                this.replyMessage("ok", index);
            }, 1000);
        },
        replyMessage(text, index) {
            // creo oggetto messaggio di risposta
            const repMessage = {
                date: this.dataCorrente,
                message: text,
                status: 'recived',
                time: this.oraCorrente
            };
            // pusho messaggio di risposta
            this.contacts[index].messages.push(repMessage);
            // aggiorno data e testo ultimo messaggio
            this.getLastMex();
            // calcolo la posizione dell'ultimo messaggio
            const lastPos = this.contacts[index].messages.length - 1;
            // sostituisco la data del nuovo messaggio per l'ultimo accesso
            this.lastData.splice(index,1,this.contacts[index].messages[lastPos].time);
            this.lastDay.splice(index,1,this.contacts[index].messages[lastPos].date.substr(0, 10));

        },
        searchChat() {
            // controllo per ogni nome se è presente la substringa in input
            for (let i = 0; i < this.contacts.length; i++) {
                // recupero la substringa
                const input = document.getElementById("floatingInputGroup1").value.toLowerCase();
                // modifico la proprietà visibile se è presente la substringa o meno
                if (this.contacts[i].name.toLowerCase().includes(input)) {
                    this.contacts[i].visible = true;
                }
                else {
                    this.contacts[i].visible = false;
                }
            }
        },
        deleteMessage(index, posizioneOggetto) {
            // controllo se quello che sto per cancellare è l'ultimo messaggio
            if (this.contacts[posizioneOggetto].messages.length == 1) {
                // creo messaggio vuoto
                const messaggioVuoto = {
                    date: "",
                    message: "",
                    status: "",
                    time: ""
                }
                // sostituisco l'ultimo mex con messaggio vuoto
                this.contacts[posizioneOggetto].messages.splice(index, 1, messaggioVuoto);

            }
            // altrimenti rimuove sempicemente l'oggetto
            else {
                this.contacts[posizioneOggetto].messages.splice(index, 1);

            };
            this.getLastMex();
            this.checkMex()

        },
        getLastMex() {
            // svuoto array
            this.lastMex = []

            for (let i = 0; i < this.contacts.length; i++) {
                // calcolo la posizione dell'ultimo messaggio per ogni contatto
                const lastPos = this.contacts[i].messages.length - 1;
                // pusho testo ultimo messaggio ma non data e ora, per tenere ultimo accesso!
                this.lastMex.push(this.contacts[i].messages[lastPos].message);
            }
        },
        getLastDataTime() {
            // svuoto array
            this.lastData = []
            this.lastDay = []
            // calcolo la posizione dell'ultimo messaggio per ogni contatto
            for (let i = 0; i < this.contacts.length; i++) {
                // calcolo la posizione dell'ultimo messaggio
                const lastPos = this.contacts[i].messages.length - 1;
                // pusho data e ora ultimo messaggio per ultimo accesso
                this.lastData.push(this.contacts[i].messages[lastPos].time);
                this.lastDay.push(this.contacts[i].messages[lastPos].date.substr(0, 10));
            }
        },
        checkMex() {
            // svuoto array di controllo presenza messaggi
            this.emptyChat = [];
            for (let i = 0; i < this.contacts.length; i++) {
                // recupero testo ultimo messaggio per ogni contatto
                const mex = this.contacts[i].messages[0].message;
                // imposto controllo a true
                let check = true;
                // se il testo è nullo imposto controllo a falso
                if (mex == "") {
                    check = false;
                }
                // pusho il valore di controllo nell'array di presenza messaggi
                this.emptyChat.push(check);
            }
        },
        now() {
            // prendo la data di js
            const currentDate = new Date();
            // la scompongo
            const anno = currentDate.getFullYear();
            const mese = currentDate.getMonth() + 1;
            const giorno = currentDate.getDate()
            const ore = currentDate.getHours();
            const minuti = currentDate.getMinutes();
            // creo una stringa con la giusta formattazione della data
            const formatDate = `${mese}/${giorno}/${anno} ${ore}:${minuti}`;
            // mando la stringa formattata in data()
            this.dataCorrente = formatDate;
            // trasformo la stringa formattata in data
            const tempDate = new Date(formatDate);
            // ricavo l'ora dalla data
            const newora = tempDate.toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit'
            });
            // assegno l'ora alla giusta variabile in data()
            this.oraCorrente = newora;
        },
        changeData() {
            // per ogni contatto, per ogni messaggio
            this.contacts.forEach((obj) =>
                obj.messages.forEach((mex) => {

                    // TOTALMENTE INUTILE, LO SO, MA ORMAI VOLEVO FORMATTARE LA DATA GIUSTA

                    // scompongo la stringa della data in formato GGMMYYYY
                    const giorno = mex.date.substr(0, 2);
                    const mese = mex.date.substr(3, 2);
                    const anno = mex.date.substr(6, 4);
                    const ora = mex.date.substr(11, 9);
                    // genero una stringa della data in formato MMGGYYYY
                    dataMex = `${mese}/${giorno}/${anno} ${ora}`;
                    // trasformo la nuova stringa in una vera data
                    const tempDate = new Date(dataMex);
                    // estraggo l'ora dalla nuova data
                    const newora = tempDate.toLocaleTimeString(undefined, {
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    // assegnazione nuova data
                    mex.time = newora;
                }
                )
            );
        }
    },
    mounted() {
        this.changeData()
        this.getLastMex()
        this.getLastDataTime()
        this.checkMex()
        this.now()
    },
};

createApp(object).mount('#app')