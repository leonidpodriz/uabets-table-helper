(function () {

    class Table {
        maxIndicationColor = "#03f8fc";
        minIndicationColor = "orange";

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
                let handicap = this.getHandicapDetailsFromRow(row, "number");
                let k1 = this.getK1DetailsFromRow(row, "number");
                let k2 = this.getK2DetailsFromRow(row, "number");
                let total = this.getTotalDetailsFromRow(row, "number");
                let greater = this.getGreaterDetailsFromRow(row, "number");
                let less = this.getLessDetailsFromRow(row, "number");

                if (!dataByTeams[team_key]) {
                    dataByTeams[team_key] = {
                        p1: [],
                        x: [],
                        p2: [],
                        handicap: [],
                        k1: [],
                        k2: [],
                        total: [],
                        greater: [],
                        less: []
                    }
                }

                p1 !== 0 && dataByTeams[team_key].p1.push(p1);
                x !== 0 && dataByTeams[team_key].x.push(x);
                p2 !== 0 && dataByTeams[team_key].p2.push(p2);
                handicap !== 0 && dataByTeams[team_key].handicap.push(handicap);
                k1 !== 0 && dataByTeams[team_key].k1.push(k1);
                k2 !== 0 && dataByTeams[team_key].k2.push(k2);
                total !== 0 && dataByTeams[team_key].total.push(total);
                greater !== 0 && dataByTeams[team_key].greater.push(greater);
                less !== 0 && dataByTeams[team_key].less.push(less);
            })

            rowsArray.forEach(row => {
                const team_key = this.getTeamKeyFromRow(row);
                let [p1Element, p1] = this.getP1DetailsFromRow(row);
                let [xElement, x] = this.getXDetailsFromRow(row);
                let [p2Element, p2] = this.getP2DetailsFromRow(row);
                let [handicapElement, handicap] = this.getHandicapDetailsFromRow(row);
                let [k1Element, k1] = this.getK1DetailsFromRow(row);
                let [k2Element, k2] = this.getK2DetailsFromRow(row);
                let [totalElement, total] = this.getTotalDetailsFromRow(row);
                let [greaterElement, greater] = this.getGreaterDetailsFromRow(row);
                let [lessElement, less] = this.getLessDetailsFromRow(row);

                let maxP1 = Math.max(...dataByTeams[team_key].p1);
                let minP1 = Math.min(...dataByTeams[team_key].p1);

                let maxP2 = Math.max(...dataByTeams[team_key].p2);
                let minP2 = Math.min(...dataByTeams[team_key].p2);

                let maxX = Math.max(...dataByTeams[team_key].x);
                let minX = Math.min(...dataByTeams[team_key].x);

                let maxHandicap = Math.max(...dataByTeams[team_key].handicap);
                let minHandicap = Math.min(...dataByTeams[team_key].handicap);

                let maxK1 = Math.max(...dataByTeams[team_key].k1);
                let minK1 = Math.min(...dataByTeams[team_key].k1);

                let maxK2 = Math.max(...dataByTeams[team_key].k2);
                let minK2 = Math.min(...dataByTeams[team_key].k2);

                let maxTotal = Math.max(...dataByTeams[team_key].total);
                let minTotal = Math.min(...dataByTeams[team_key].total);

                let maxGreater = Math.max(...dataByTeams[team_key].greater);
                let minGreater = Math.min(...dataByTeams[team_key].greater);

                let maxLess = Math.max(...dataByTeams[team_key].less);
                let minLess = Math.min(...dataByTeams[team_key].less);

                if (p1 === maxP1) {
                    p1Element.style.background = this.maxIndicationColor;
                } else if (p1 === minP1) {
                    p1Element.style.background = this.minIndicationColor;
                }

                if (p2 === maxP2) {
                    p2Element.style.background = this.maxIndicationColor;
                } else if (p2 === minP2) {
                    p2Element.style.background = this.minIndicationColor;
                }

                if (x === maxX) {
                    xElement.style.background = this.maxIndicationColor;
                } else if (x === minX) {
                    xElement.style.background = this.minIndicationColor;
                }

                if (handicap === maxHandicap) {
                    handicapElement.style.background = this.maxIndicationColor;
                } else if (handicap === minHandicap) {
                    handicapElement.style.background = this.minIndicationColor;
                }

                if (k1 === maxK1) {
                    k1Element.style.background = this.maxIndicationColor;
                } else if (k1 === minK1) {
                    k1Element.style.background = this.minIndicationColor;
                }

                if (k2 === maxK2) {
                    k2Element.style.background = this.maxIndicationColor;
                } else if (k2 === minK2) {
                    k2Element.style.background = this.minIndicationColor;
                }

                if (total === maxTotal) {
                    totalElement.style.background = this.maxIndicationColor;
                } else if (total === minTotal) {
                    totalElement.style.background = this.minIndicationColor;
                }

                if (greater === maxGreater) {
                    greaterElement.style.background = this.maxIndicationColor;
                } else if (greater === minGreater) {
                    greaterElement.style.background = this.minIndicationColor;
                }

                if (less === maxLess) {
                    lessElement.style.background = this.maxIndicationColor;
                } else if (less === minLess) {
                    lessElement.style.background = this.minIndicationColor;
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