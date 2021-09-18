exports.CREATE = async (collection, payload) => {
  const getInsert = await collection.create(payload);
  return getInsert;
};

exports.FINDALL = async (collection, queryString = null) => {
  const findAllData = await collection.find(queryString);
  return findAllData;
};

exports.FINDBYID = async (collection, id, queryString = null) => {
  const findData = await collection.findOne({ _id: id }, queryString).lean();
  return findData;
};

exports.UPDATE = async (collection, id, payload) => {
  const getUpdated = await collection.updateOne({ _id: id }, payload);
  return getUpdated;
};

exports.DELETE = async (collection, id) => {
  const getDeleted = await collection.deleteOne({ _id: id });
  return getDeleted;
};

exports.FINDBYUSERNAME = async (collection, id, queryString = null) => {
  const findData = await collection
    .findOne({ username: id }, queryString)
    .lean();
  return findData;
};

exports.FINDBYPAGINATION = async (collection, currentPage, no_of_records) => {};
