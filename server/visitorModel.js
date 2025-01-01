import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  uuid: { type: String, required: true },
  markURLs: [{ type: String, default: [] }],
  ip: { type: String, required: true },
  visitTime: { type: Date, default: Date.now },
  location: {
    country: { type: String, default: 'Unknown' },
    city: { type: String, default: 'Unknown' },
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 },
  },
  device: {
    browser: { type: String, default: 'Unknown' },
    os: { type: String, default: 'Unknown' },
    type: { type: String, default: 'Unknown' },
    screenResolution: { type: String, default: 'Unknown' },
  },
  behavior: {
    referrer: { type: String, default: 'Direct' },
    timeSpent: { type: Number, default: 0 }, // in seconds
    pagesVisited: { type: [String], default: [] },
  },
  visitorRank: { type: Number},
});

const Visitor = mongoose.model('Visitor', visitorSchema);
export default Visitor;
