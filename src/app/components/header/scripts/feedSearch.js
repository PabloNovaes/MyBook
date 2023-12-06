import { User } from "../../../class/user.class.js"
const currentUrl = window.location.href

if (currentUrl.includes("/feed")) {

    const searchResults = document.querySelector("#search-results")
    const skeletonElement = document.querySelector(".skeleton")
    const searchInput = document.querySelector("#search")
    const header = document.querySelector("#main-header")
    const section = document.querySelector("#posts")


    function clearList() {
        const elements = searchResults.querySelectorAll("li")
        elements.forEach(element => {
            if (!element.classList.contains("skeleton")) {
                return searchResults.removeChild(element)
            }
        })
    }

    function renderResults(data) {
        skeletonElement.style.display = "none"
        const elements = searchResults.querySelectorAll("li")

        if (elements.length == 0) return

        const resultsElements = data.map(user => {
            const { id, name, avatar_url } = user
            const newElement = document.createElement("li")
            newElement.innerHTML = `
            <a href=/users/id=${id}>
            <img src=${avatar_url}></img>
            <h2>${name}</h2>
            </a>
            `
            searchResults.appendChild(newElement)
            return newElement

        });

        resultsElements.forEach(currentElement => {
            elements.forEach(element => {
                const newElementName = currentElement.querySelector("h2").textContent
                const currentElementName = element.querySelector("h2").textContent

                if (newElementName == currentElementName) {
                    searchResults.removeChild(currentElement)
                }
            })
        })


    }

    const inputEvents = {
        focus() {
            if (window.innerWidth > 820) {
                section.style.zIndex = "-1"
            }
            header.style.zIndex = "10"
            searchResults.style.height = "100%"
        },
        blur() {
            section.style.zIndex = "0"
            header.style.zIndex = ""
            searchResults.style.height = "0"
        }
    }
    searchInput.addEventListener("blur", inputEvents.blur)

    searchInput.addEventListener("keyup", async (e) => {
        if (searchInput.value.trim() == 0) {
            return searchResults.style.height = "0"
        }

        inputEvents.focus()
        skeletonElement.style.display = "flex"

        const userClass = new User()
        const query = searchInput.value

        clearList()

        const results = await userClass.findUser(query)

        if (results.length == 0) return

        return renderResults(results)
    })

}
