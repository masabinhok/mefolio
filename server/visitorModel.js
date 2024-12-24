import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  uuid: { type: String, required: true },
  markURLs: [{ type: String, required: true }],
  ip: { type: String, required: true },
  visitTime: { type: Date, default: Date.now },
  location: {
    country: String,
    city: String,
    latitude: Number,
    longitude: Number,
  },
  device: {
    browser: String,
    os: String,
    type: String, // Desktop, Mobile, etc.
    screenResolution: String,
  },
  behavior: {
    referrer: String,
    timeSpent: Number, // in seconds
    pagesVisited: [String],
  },
});

const Visitor = mongoose.model('Visitor', visitorSchema);
export default Visitor;