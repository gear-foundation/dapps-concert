export const payloads = {
    create:  function(creator: string, id: number, tickets: number, date: number) {
        return {
            Create: {
                creator: creator,
                concert_id: id,
                number_of_tickets: tickets,
                date: date,
            }
        }
    },
    hold: function(id: number) {
        return {
            Hold: {
                concert_id: id,
            }
        }
    },
    buyTickets: function(id: number, amount: number, metadata: any[]) {
        return {
            BuyTickets: {
                concert_id: id,
                amount: amount,
                metadata: metadata,
            }
        }
    }
};
