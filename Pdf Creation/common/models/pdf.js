"use strict";
module.exports = async function(Pdf) {
    let json = require("../../component/json");
    var fs = require("fs");
    var pdf = require("dynamic-html-pdf");
    var html = fs.readFileSync(__dirname + "\\template.html", "utf8");

    let HTML = "";

    //get sections from Json
    let sections = json[0].report.sections;
    //length of sections
    // let lengthOfSections = sections.length;
    //Loop on Each Section And Prepare the Json for HTML
    for (let index = 0; index < sections.length; index++) {
        console.log("----------Section Start--------");
        HTML = HTML + "<div class='container'  >";
        //Save the name of section
        let nameOfSection = sections[index].name;
        HTML = HTML + "<h1>" + (index + 1) + ". " + nameOfSection + "</h1>";
        console.log(nameOfSection);
        //TODO Print the name in the pdf.
        recurrsive(sections[index]);
        HTML = HTML + "</div>";
    }

    function recurrsive(Section) {
        let items = Section.items;

        for (var i = 0; i < items.length; i++) {
            switch (items[i].type) {
                case "Section":
                    //HTML = HTML + "<p style='font-size:20px'><b>" + items[i].title + "</b></p>";
                    HTML = HTML + "<table style='border:1px solid black;width:100%;page-break-inside: avoid;border-collapse:collapse'>";
                    if (Object.keys(items[i].section).length != 0) {
                        HTML = HTML + "<tr><td style='page-break-inside:avoid;'><span style='font-size:20px'><b>" + items[i].section.name + "</b></span></td></tr>";
                        //HTML = HTML + "<tr>";
                        recurrsive(items[i].section);
                        HTML = HTML + "</table>"
                    }
                    // HTML = HTML + "</table><br>";
                    break;
                case "Button":
                    console.log("Its Button");
                    let v = items[i].itemData[0].itemValue;
                    if (v != "") {
                        HTML = HTML + "<tr><td style='border:1px solid black;font-size:medium '>" + v + "</td>";
                    }
                    /*else {
                                           HTML = HTML + "<td style='border:1px solid black;word-wrap:break-word'>" + "" + "</td>";
                                       }*/
                    HTML = HTML + "</tr>";
                    break;
                case "Table":
                    console.log("Its a A Tabel");
                    let t = items[i].section.items;
                    let tlen = items[i].section.items.length;
                    HTML = HTML + "<table style = 'border:1px solid black;table-layout:fixed;width:100%;page-break-inside: avoid;border-collapse:collapse'><thead><tr style='border: 1px solid black;'>"
                    for (var ii = 0; ii < tlen; ii++) {
                        HTML = HTML + "<th style='padding:15px;text-align:center;border:1px solid black;page-break-inside: avoid;'>" + t[ii].title + "</th>";
                    }
                    HTML = HTML + "</thead><tbody>"
                    for (let k = 0; k < t[0].itemData.length; k++) {
                        HTML = HTML + "<tr style='border: 1px solid black;'>";
                        for (let l = 0; l < tlen; l++) {
                            switch (t[l].type) {
                                case 'TextView':
                                    HTML = HTML + "<td style='padding:15px;text-align:center;border:1px solid black;page-break-inside: avoid;'>" + t[l].itemData[k].itemValue + "</td>";
                                    break;
                                case 'Button':
                                    HTML = HTML + "<td style='padding:15px;text-align:center;border:1px solid black;page-break-inside: avoid;'>" + t[l].itemData[k].itemValue + "</td>";
                                    break;
                                case 'Signature':
                                    HTML = HTML + "<td style='padding:15px;text-align:center;border:1px solid black;page-break-inside: avoid;'><img alt='no Image' style='width:50px;height:50px' src=" + t[l].itemData[k].itemValue + " /></td>";
                                    break;
                                case 'RadioButton':
                                    var radioSection = t[l].section;
                                    var radioItems = radioSection.items;
                                    HTML = HTML + "<td style='text-align:center;border:1px solid black;page-break-inside: avoid;'>"
                                    for (var r = 0; r < radioItems.length; r++) {
                                        console.log(radioItems[r].itemData[k].itemValue);
                                        if (radioItems[r].itemData[k].itemValue == "true") {
                                            HTML = HTML + "<input type='checkbox' checked >&nbsp;&nbsp;" + radioItems[r].title + "&nbsp;&nbsp;";
                                        } else if (radioItems[r].itemData[k].itemValue == "false") {
                                            HTML = HTML + "<input type='checkbox'>&nbsp;&nbsp;" + radioItems[r].title + "&nbsp;&nbsp;";
                                        }
                                    }
                                    HTML = HTML + "</td>";
                                    break;
                                default:
                                    break;
                            }
                        }
                        HTML = HTML + "</tr>";
                    }

                    HTML = HTML + "</tbody></table><br>";
                    break;
                case "RadioButton":
                    //TODO Radio Button
                    HTML = HTML + "</table><table style = '1px solid black;width:100%;page-break-inside: avoid;'><tr><td style='border:1px solid black;font-size:18px;'><b>" + items[i].title + "</b></td></tr><tr><td style='border:1px solid black;'>";

                    let RadioItems = items[i].section.items;
                    for (let ri = 0; ri < RadioItems.length; ri++) {
                        //console.log(RadioItems[ri].itemData[0].itemValue);
                        if (RadioItems[ri].itemData[RadioItems[ri].itemData.length - 1].itemValue == "true") {
                            HTML = HTML + "<span style='display:inline-block;font-size:medium'><input type='checkbox' checked > " + RadioItems[ri].title + "</span>&nbsp;";
                        } else if (RadioItems[ri].itemData[RadioItems[ri].itemData.length - 1].itemValue == "false") {
                            HTML = HTML + "<span style='display:inline-block;font-size:medium'><input type='checkbox'> " + RadioItems[ri].title + "</span>&nbsp;";
                        }

                    }
                    HTML = HTML + "</td></tr></table>";
                    break;
                case "DatePicker":
                    console.log("Its a DatePicker");
                    // show button and its data
                    let datevalue = items[i].itemData[items[i].itemData.length - 1].itemValue;
                    if (datevalue != "") {
                        HTML = HTML + "<tr><td style='border:1px solid black;font-size:medium;page-break-inside:avoid'>" + datevalue + "</td>";
                    }
                    /*else {
                                           HTML = HTML + "<td style='border:1px solid black;word-wrap:break-word'>" + "" + "</td>";
                                       }*/
                    HTML = HTML + "</tr>"
                    break;
                case "CheckBox":
                    console.log("Its a CheckBox");
                    //HTML = HTML + "<tr>"
                    if (items[i].itemData[items[i].itemData.length - 1].itemValue == "true") {
                        HTML = HTML + "<tr><td style='border:1px solid black;font-size:medium;page-break-inside:avoid'><input type='checkbox'  checked>&nbsp;" + items[i].title + "</td></tr>";
                    }
                    /* else {
                                            HTML = HTML + "<td style='border:1px solid black;word-wrap:break-word'><input type='checkbox' ; >&nbsp;" + items[i].title + "</td>&nbsp;";
                                        }*/
                    // HTML = HTML + "</tr>";
                    break;
                case "TextView":
                    console.log("Its Text View");
                    HTML = HTML + "<tr><td style='border:1px solid black;font-size:18px; '><b>" + items[i].title + "</b></td></tr>";

                    break;
                case "Goals":
                    recurrsive(items[i].section);
                    break;
                case "EditText":
                    let value = items[i].itemData[0].itemValue;
                    if (value != "") {
                        HTML = HTML + "<tr><td style='border:1px solid black;font-size:medium'> " + value + "</td></tr>";
                    }
                    /* else {
                                            HTML = HTML + "<td style='border:1px solid black;word-wrap:break-word'>" + "&nbsp;&nbsp;" + "</td></tr>";
                                        }*/

                    break;
                default:
                    break;
            }
        }
    }

    console.log(HTML);
    // Custom handlebar helper
    pdf.registerHelper("ifCond", function(value) {
        return HTML;
    });

    var options = {
        format: "A3",
        orientation: "portrait",
        border: "10mm",
        unbreakable: true
    };
    var users = [{
            name: "Its Evaluation ",
            tabel: [{
                    name: "name",
                    age: "Age"
                },
                {
                    name: "Athar",
                    age: 20
                },

                {
                    name: "Arslan",
                    age: 19
                },
                {
                    name: "Arslan",
                    age: 19
                },
                {
                    name: "Arslan",
                    age: 19
                }
            ]
        },
        {
            name: "bbb",
            age: 25,
            dob: "1/1/1995"
        }
    ];
    var section = [
        "Section1",
        "Section2",
        "Section3",
        "Section4",
        "Section5",
        "Section6",
        "Section7",
        "Section8"
    ];

    var document = {
        type: "file", // 'file' or 'buffer'
        template: html,
        context: {
            users: users
        },
        path: "./output2.pdf" // it is not required if type is buffer
    };

    pdf
        .create(document, options)
        .then(res => {
            console.log(res);

        })
        .catch(error => {
            console.error(error);
        });
};