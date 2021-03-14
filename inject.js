(function () {

    class Table {
        constructor(tableElement) {
            this.element = tableElement;
        }

        getTeamKeyFromRow(row) {
            let team_1 = row.querySelector("td:nth-child(2)").textContent;
            let team_2 = row.querySelector("td:nth-child(3)").textContent;

            return team_1 + team_2
        }

        getColumnDetailsFromRow(row, columnNumber, mode) {
            const element = row.querySelector(`td:nth-child(${columnNumber})`);
            const text = element.textContent;

            if (mode === "number") {
                return +text || 0;
            }
            return [element, +text || text];
        }

        getP1DetailsFromRow(row, mode) {
            return this.getColumnDetailsFromRow(row, 4, mode);
        }

        getXDetailsFromRow(row, mode) {
            return this.getColumnDetailsFromRow(row, 5, mode);
        }

        getP2DetailsFromRow(row, mode) {
            return this.getColumnDetailsFromRow(row, 6, mode);
        }

        getHandicapDetailsFromRow(row, mode) {
            return this.getColumnDetailsFromRow(row, 7, mode);
        }

        getK1DetailsFromRow(row, mode) {
            return this.getColumnDetailsFromRow(row, 8, mode);
        }

        getK2DetailsFromRow(row, mode) {
            return this.getColumnDetailsFromRow(row, 9, mode);
        }

        getTotalDetailsFromRow(row, mode) {
            return this.getColumnDetailsFromRow(row, 10, mode);
        }

        getGreaterDetailsFromRow(row, mode) {
            return this.getColumnDetailsFromRow(row, 11, mode);
        }

        getLessDetailsFromRow(row, mode) {
            return this.getColumnDetailsFromRow(row, 12, mode);
        }

        process() {
            let rows = this.element.querySelectorAll("tr[class]");
            let rowsArray = Array.from(rows)
            let dataByTeams = {};

            rowsArray.forEach(row => {
                const team_key = this.getTeamKeyFromRow(row);
                let p1 = this.getP1DetailsFromRow(row, "number");
                let x = this.getXDetailsFromRow(row, "number");
                let p2 = this.getP2DetailsFromRow(row, "number");

                if (!dataByTeams[team_key]) {
                    dataByTeams[team_key] = {p1: [], x: [], p2: []}
                }

                p1 !== 0 && dataByTeams[team_key].p1.push(p1);
                x !== 0 && dataByTeams[team_key].x.push(x);
                p2 !== 0 && dataByTeams[team_key].p2.push(p2);
            })

            rowsArray.forEach(row => {
                const team_key = this.getTeamKeyFromRow(row);
                let [p1Element, p1] = this.getP1DetailsFromRow(row);
                let [xElement, x] = this.getXDetailsFromRow(row);
                let [p2Element, p2] = this.getP2DetailsFromRow(row);

                let maxP1 = Math.max(...dataByTeams[team_key].p1);
                let minP1 = Math.min(...dataByTeams[team_key].p1);

                let maxP2 = Math.max(...dataByTeams[team_key].p2);
                let minP2 = Math.min(...dataByTeams[team_key].p2);

                let maxX = Math.max(...dataByTeams[team_key].x);
                let minX = Math.min(...dataByTeams[team_key].x);

                if (p1 === maxP1) {
                    p1Element.style.background = "#03f8fc"
                } else if (p1 === minP1) {
                    p1Element.style.background = "orange"
                }

                if (p2 === maxP2) {
                    p2Element.style.background = "#03f8fc"
                } else if (p2 === minP2) {
                    p2Element.style.background = "orange"
                }

                if (x === maxX) {
                    xElement.style.background = "#03f8fc"
                } else if (x === minX) {
                    xElement.style.background = "orange"
                }
            })
        }
    }


    function main() {
        let tables = document.getElementsByTagName("table");
        Array.from(tables).forEach(table => {
            table.addEventListener("click", event => {
                new Table(event.currentTarget).process()
            })
        })
    }

    main();

    alert("Helper was loaded! Click on any table to start!");

})();