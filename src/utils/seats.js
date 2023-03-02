class SeatRepository {
    constructor(rows) {
        this.rows = rows
        this.totalCapacity = rows * 6
        this.seats = this.initializeSeats(rows)
    }
    
    initializeSeats = (rows) => {
        const seats = []
        const rowIndices = [...Array(rows).keys()]
        rowIndices.forEach((rowId) => {
            const row = []
            const columns = [...Array(6).keys()]
            columns.forEach((columnId) => {
                row.push({
                    id: rowId * 6 + columnId,
                    number: rowId * 6 + columnId + 1,
                    isWindow: columnId === 0 || columnId === 5,
                    isAisle: columnId === 2 || columnId === 3,
                    passenger: undefined,
                    bookedBy: ''
                })
            })
            seats.push(row)
        })
        return seats
    }

    getSeats = () => this.seats || []

    findEmptyWindowSeat = () => {
        for (let rowIndex = 0; rowIndex < this.seats.length; rowIndex++) {
            for (let colIndex = 0; colIndex < 6; colIndex++) {
                const seat = this.seats[rowIndex][colIndex]
                if (seat.isWindow && !seat.passenger) {
                    return { rowIndex, colIndex }
                }
            }
        }
    }

    findEmptyMiddleSeat = () => {
        for (let rowIndex = 0; rowIndex < this.seats.length; rowIndex++) {
            for (let colIndex = 0; colIndex < 6; colIndex++) {
                const seat = this.seats[rowIndex][colIndex]
                if (!seat.isWindow && !seat.isAisle && !seat.passenger) {
                    return { rowIndex, colIndex }
                }
            }
        }
    }

    findAisleSeat = () => {
        for (let rowIndex = 0; rowIndex < this.seats.length; rowIndex++) {
            for (let colIndex = 0; colIndex < 6; colIndex++) {
                const seat = this.seats[rowIndex][colIndex]
                if (seat.isAisle && !seat.passenger) {
                    return { rowIndex, colIndex }
                }
            }
        }
    }

    findSeatForSenior = () => {
        return this.findEmptyWindowSeat() || this.findEmptyWindowSeat() || this.findAisleSeat()
    }

    findSeatForAdults = () => {
        return this.findAisleSeat() || this.findEmptyWindowSeat() || this.findEmptyWindowSeat()
    }

    allocateSeats = (passengers, agentEmail) => {
        const olderPassengers = passengers.filter((passenger) => passenger.age >= 60)
        olderPassengers.sort((a, b) => a.gender.localeCompare(b.gender))
        const adultPassengers = passengers.filter((passenger) => passenger.age < 60)
        adultPassengers.sort((a, b) => a.gender.localeCompare(b.gender))
        olderPassengers.concat(adultPassengers).forEach((passenger) => this.allocateSeat(passenger, agentEmail))
    }

    allocateSeat = (passenger, agentEmail) => {
        const { rowIndex, colIndex } = passenger.age >= 60 ? this.findSeatForSenior() : this.findSeatForAdults()
        console.log(rowIndex, colIndex)
        const seat = this.seats[rowIndex][colIndex]
        this.seats[rowIndex][colIndex] = {
            ...seat,
            passenger,
            bookedBy: agentEmail
        }
    }
}

export default SeatRepository