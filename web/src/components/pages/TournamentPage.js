import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Page, Grid } from "tabler-react";

import SiteWrapper from "../SiteWrapper";
import LevelsCardPreview from "../levels/LevelCardPreview";
import ValidationCouponStamp from "../coupon/ValidateCouponStampCard";
import { fetchLevels as fetchLevelsAction } from "../../actions/tournaments";

class TournamentPage extends React.Component {

    componentDidMount() {
      const { fetchLevelsAction, tournaments: { activeTournament } } = this.props;
      fetchLevelsAction(activeTournament.metadata.id);
    }
  
    render() {
        const { tournaments: { activeTournament, activeLevels } } = this.props;
        const name = activeTournament ? activeTournament.name : undefined;

        return (
            <SiteWrapper>
              <Page.Content title="Tournament" subTitle={name}>
                <Grid.Row>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Col xs={12} sm={8} lg={6}>
                    <h3>Levels</h3>
                    {activeLevels && <LevelsCardPreview levels={activeLevels} />}
                  </Grid.Col>
                  <Grid.Col xs={12} sm={4} lg={3}>
                    <h3>Actions</h3>
                    <ValidationCouponStamp />
                  </Grid.Col>
                </Grid.Row>
              </Page.Content>
            </SiteWrapper>
          );
    }
}

TournamentPage.propTypes = {
    tournaments: PropTypes.object,
    activeTeam: PropTypes.object,
    fetchLevelsAction: PropTypes.func
};

const mapStateToProps = state => ({
    tournaments: state.tournaments
});

const mapDispatchToProps = {
  fetchLevelsAction: (tournamentID) => fetchLevelsAction(tournamentID),
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TournamentPage);

