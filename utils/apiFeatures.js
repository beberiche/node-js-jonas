class APIFeatures {
  // BUILD QUERY
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // 1) Filtering
  filter() {
    const queryObj = Object.assign(this.queryString);
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    //  examples
    // {diffficulty: 'easy', duration : { $gte: 5}}
    // gte,gt,lte,lt

    // const tours = await Tour.find({
    //   duration: 5,
    //   difficulty: 'easy',
    // });

    // const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    // let query = Tour.find(JSON.parse(queryStr));'
    return this;
  }

  // 2) Sorting
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
      // sort('price ratingsAverage')
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  // 3) Field limiting
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  // 4) Pagination
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    // page=2&limit=10, page1=1-10, page2=11-20, page3=21-30...
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
