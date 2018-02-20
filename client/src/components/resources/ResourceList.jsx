import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import RenderCard from '../cards/RenderCard';
import Pagination from '../common/Pagination';
import { switchPage } from '../../actions/resources';
import { PAGINATION_DELTA } from '../../constants/ResourcesConstants';

class ResourceList extends Component {
  render() {
    const { selectedResources, pagesCount, pageNumber } = this.props;
    if (!selectedResources || !Array.isArray(selectedResources) || selectedResources.length <= 0) {
      return (
        <Row>
          <Col mdOffset={6}>
                        Search for resources...
                    </Col>
        </Row>
      );
    }
    const resourcesCards = selectedResources.map(resource => (
      <Col key={resource.id} xs={6} sm={4}>
        <RenderCard
          id={resource.id}
          imageUrl={resource.imageUrl}
          title={resource.name}
          description={resource.description.substring(0, 30)}
          href={resource.href}
        />
      </Col>
    ));

    return (
      <Row className="resources-list-row">
        <Row>
          {resourcesCards}
        </Row>
        <Row>
          <Col sm={8} mdOffset={4}>
            <Pagination
              pagesCount={pagesCount}
              switchPage={switchPage}
              pageNumber={pageNumber}
              delta={PAGINATION_DELTA}
            />
          </Col>
        </Row>
      </Row>

    );
  }
}

const mapStateToProps = state => ({
  selectedResources: state.resourcesReducer.selectedResources,
  pageNumber: state.resourcesReducer.pageNumber,
  pagesCount: state.resourcesReducer.pagesCount,
});

export default connect(mapStateToProps)(ResourceList);
