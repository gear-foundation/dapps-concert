export const payloads = {
    init: function(name: string, symbol: string, base_uri: string) {
        return {
            name,
            symbol,
            base_uri,
        }
    },
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