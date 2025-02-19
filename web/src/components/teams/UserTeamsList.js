import * as React from "react";
import { connect } from "react-redux"
import { Card, Table, Avatar, Button } from "tabler-react";
import PropTypes from "prop-types";
import { fetchUserTeams as fetUserTeamsListAction } from "../../actions/teams"

const TeamsRows = ({teamsList, activeTeam}) => {
    return teamsList.map((team) => {

        const isActive = team.metadata.id === activeTeam.metadata.id;

        return (
            <Table.Row key={team.metadata.id}>
            <Table.Col className="w-1">
                <Avatar imageURL={team.gravatar_url} />
            </Table.Col>
            <Table.Col>{team.name}</Table.Col>
            <Table.Col>{team.locale}</Table.Col>
            {isActive && <Table.Col>
                Active
            </Table.Col>}
            {!isActive && <Table.Col>
                <Button color="info" size="sm">Set Active</Button>
            </Table.Col>}
        </Table.Row>
        )
    })
                    
}

class UserTeamsList extends React.PureComponent {

    componentDidMount() {
        const { fetUserTeamsListAction, activeUser } = this.props;
        const userID = activeUser.metadata.id || "fakeID";
        fetUserTeamsListAction(userID);
    }
    
    render() {
        const { userTeamsList, activeTeam } = this.props;
        return (
            <Card>
                  <Card.Header>
                    <Card.Title>My Teams</Card.Title>
                  </Card.Header>
                  <Table
                    cards={true}
                    striped={true}
                    responsive={true}
                    className="table-vcenter"
                  >
                    <Table.Header>
                      <Table.Row>
                        <Table.ColHeader colSpan={2}>Name</Table.ColHeader>
                        <Table.ColHeader>Locale</Table.ColHeader>
                        <Table.ColHeader></Table.ColHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {userTeamsList && <TeamsRows teamsList={userTeamsList} activeTeam={activeTeam} />}
                    </Table.Body>
                  </Table>
                </Card>
        )
    }
}

UserTeamsList.propTypes = {
    activeUser: PropTypes.object,
    activeTeam: PropTypes.object,
    userTeamsList: PropTypes.array,
    fetUserTeamsListAction: PropTypes.func
};

const mapStateToProps = state => ({
    userTeamsList: state.teams.userTeamsList,
    activeTeam: state.teams.activeTeam,
    activeUser: state.userSession.activeUser
});

const mapDispatchToProps = {
    fetUserTeamsListAction: (userID) => fetUserTeamsListAction(userID)
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserTeamsList);