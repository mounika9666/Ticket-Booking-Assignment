class UserRepository {
    storeUser = (user) => {
        localStorage.setItem("users", JSON.stringify({...this.getUsers(), [user.email]: user}))
    }

    getUsers = () => {
        return JSON.parse(localStorage.getItem("users"))
    }

    getUser = (email) => {
        const users = this.getUsers()
        return users[email]
    }

    authenticateUser = (email, password) => {
        const user = this.getUser(email)
        return user.password === password ? user : undefined
    }

    userLoggedIn = (email, isLoggedIn) => {
        const user = { ...this.getUser(email), isLoggedIn: isLoggedIn }
        this.storeUser(user)
    }

    getLoggedInUser = () => {
        const users = this.getUsers()
        return Object.values(users).find((user) => user.isLoggedIn)
    }
}

export default new UserRepository()