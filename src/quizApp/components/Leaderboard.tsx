import { Component, ReactNode } from "react";

export type LeaderboardProps = {
    isEmbedded?: boolean,
    result: { username: string, total: number }[],
    username: string, back: () => void
};

class Leaderboard extends Component<LeaderboardProps> {

    render() {
        const rowlist: ReactNode[] = [];
        let header;
        let label;
        if (!this.props.isEmbedded) {
            label = (
                <div className="alert alert-warning alert-dismissible"> Leaderboard:
                    <button type="button" className="close" onClick={() => this.props.back()}>Back</button>
                </div>
            );
        }
        if (this.props.result) {
            let i = 1;
            this.props.result.forEach(element => {
                if (element) {
                    let tr_class = "";
                    if (element.username === this.props.username) {
                        tr_class = "table-warning";
                    }
                    rowlist.push(
                        <tr className={tr_class}>
                            <td>{i}</td>
                            <td>{element.username}</td>
                            <td>{element.total}</td>
                        </tr>
                    )
                    i++;
                }
            });
            header = (
                <thead className="thead-dark">
                    <tr>
                        <th>Position</th>
                        <th>Username</th>
                        <th>Total</th>
                    </tr>
                </thead>
            )
        }
        return (
            <div>
                {label}
                <table className="table">
                    {header}
                    <tbody>
                        {rowlist}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default Leaderboard;