export const payloads = {
    create: {
        Create: {
            creator: `0x5FxowUbNWoiZBavDB2gCq7JtjDX4KhNRH8ZNAGq7p6gDcbZY`,
            concert_id: 1,
            number_of_tickets: 100,
            date: 1001010,
        },
    },
    hold: {
        Hold: {
            concert_id: 1,
        },
    },
    buyTickets: {
        BuyTickets: {
            concert_id: 1,
            amount: 10,
            metadata: [
                {
                    title: "Ticket #1",
                    description: "Metallica Concert Ticket",
                    media: "Row 1 Seat 1",
                    reference: "Empty",
                }
            ],
        }
    }
};
