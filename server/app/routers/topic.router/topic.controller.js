const { getStatusCode } = require('./../../../utils');
const uuidv1 = require('uuid/v1');
const { Observable } = require('rxjs/Rx');
const { logErrorMessage } = require('./../../../utils');

const badRequest = getStatusCode('badRequest');

const mapTopicToViewModel = (topic) => ({
  id: topic.id,
  name: topic.name,
  thematics: topic.thematics
});

const init = (app, data) => {
  const topicContorller = Object.create(null);
  topicContorller.getTopics = () => Observable.fromPromise(data.topics.getAll())
    .switchMap(topics => Observable.from(topics)
      .map(mapTopicToViewModel))
    .toArray()
    .catch(error => logErrorMessage(error));

  topicContorller.getTopicById = (id) => (
    (id) && (typeof id === 'string') && (id.length > 0) ?
    Observable.fromPromise(data.topics.getByTopicId(id))
    .map(mapTopicToViewModel) :
    Observable.throw(new Error('Id should be valid string'))
  );

  topicContorller.create = (topic) => new Promise((resolve, reject) => {
    const id = uuidv1();
    const topicEntity = Object.create(null);

    topicEntity.topicId = id;
    topicEntity.thematics = [];

    const checkIfThematicsExistsPromises = [];
    topic.thematics.forEach(thematic => {
      checkIfThematicsExistsPromises.push(data.thematics.getByName(thematic));
    });

    Promise.all(checkIfThematicsExistsPromises)
      .then(values => {
        const addMissingThematicPromises = [];
        values.forEach((value, index) => {
          if (!value) {
            const thematicId = uuidv1();
            addMissingThematicPromises.push(data.thematics.add({
              thematicId,
              name: topic.thematics[index]
            }));

            return;
          }
        });
      });
  }); // End create

  return topicContorller;
};

module.exports = { init };

// topic.thematics.forEach(thematic => {
//   data.thematics.getByName(thematic)
//     .then(foundedThematic => {
//       if (foundedThematic) {
//         topicEntity.thematics.push(foundedThematic.thematicId);
//         resolve();
//       }
//
//       const thematicId = uuidv1();
//       data.thematics.add({
//           thematicId,
//           name: thematic
//         })
//         .then(() => {
//           topicEntity.thematics.push({
//             thematicId,
//             name: thematic
//           });
//
//           resolve();
//         });
//     })
//     .catch(e => {
//       console.log(`in the catch ${e}`);
//     }))
