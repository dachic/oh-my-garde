import React, { useEffect, useState } from "react";
import { Table, Card, Button, CardBody, Tooltip } from "reactstrap";
import matchingAPI from "../../api/matching";
import InternDetails from "./Answers/InternDetails";
import TooltipCriteria from "./Answers/TooltipCriteria";

const Answers = props => {
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        matchingAPI
            .getInternsRankingForGuard(props.guard)
            .then(data => setRanking(data));
    }, []);

    function getBadge(skills, aggrement) {
        return skills.includes(aggrement) ? (
            <span className="badge badge-soft-success py-1">OK</span>
        ) : (
            <span className="badge badge-soft-danger py-1">KO</span>
        );
    }

    function affectIntern(intern) {
        alert("TODO: join guard with this intern:" + intern);
    }

    function displayInternDetails(index, e) {
        document.getElementById("internDetails-" + index).style.display =
            e.type == "mouseover" ? "block" : "none";
    }

    return (
        <Card>
            <CardBody className="pb-0">
                <h4 className="p-2 card-title">Résultats</h4>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nom</th>
                            <th>Pourcentage</th>
                            <th>
                                <TooltipCriteria id="firstCriteria" description="l'Interne a déja effectué un stage dans cet hopital" title="Critère 1"/>
                            </th>
                            <th>
                                <TooltipCriteria id="secondCriteria" description="l'Interne a les aggrements necessaire" title="Critère 2"/>
                                </th>
                            <th>
                                <TooltipCriteria id="thirdCriteria" description="l'Interne a occupé un poste identique" title="Critère 3"/>
                                </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ranking.map((rank, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <InternDetails
                                            contact={rank.intern}
                                            rank={index}
                                        />
                                        <a
                                            href="#"
                                            onMouseOver={e =>
                                                displayInternDetails(index, e)
                                            }
                                            onMouseOut={e => {
                                                displayInternDetails(index, e);
                                            }}
                                        >
                                            {rank.intern.lastname.toUpperCase()}{" "}
                                            {rank.intern.firstname}
                                        </a>
                                    </td>
                                    <td>{rank.score.percent} %</td>
                                    <td>
                                        {getBadge(
                                            rank.score.attribute,
                                            "WORKED_AT_HOSPITAL"
                                        )}
                                    </td>
                                    <td>
                                        {getBadge(
                                            rank.score.attribute,
                                            "HAS_REQUIRED_APPROVALS"
                                        )}
                                    </td>
                                    <td>
                                        {getBadge(
                                            rank.score.attribute,
                                            "WORKED_IN_A_SAME_POSITION"
                                        )}
                                    </td>
                                    <td>
                                        <Button
                                            color="primary"
                                            onClick={() =>
                                                affectIntern(rank.intern.id)
                                            }
                                        >
                                            Affecter
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

export default Answers;
