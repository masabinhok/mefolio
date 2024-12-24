import express from 'express';
import Visitor from './visitorModel.js';
import {v4 as uuidv4} from 'uuid' //unique id create garna uuid user gareko
import geoip from 'geoip-lite'; //geo location ko lagi
import useragent from 'useragent'; //user information ko lagii.
import requestIp from 'request-ip'; //ip address nikalne.


const router = express.Router();



router.post('/name', async(req, res)=>{
  console.log('hi')
  const {name} = req.body;
  const ip = requestIp.getClientIp(req);
  const location = geoip.lookup(ip);
  console.log(location);
  const agent = useragent.parse(req.headers['user-agent']);
  const uuid = uuidv4(); 

  console.log(agent)

  const visitTime = new Date();
  const referrer = req.headers.referer || req.req.headers.referrer || 'Direct';

  const visitorData = {
    name,// Ensure the name field is provided
    uuid, 
    ip, 
    visitTime, 
    location: location ? {
      country: location.country || 'Unknown',
      city: location.city || 'Unknown',
      latitude: location.ll ? location.ll[0] : null,
      longitude: location.ll ? location.ll[1] : null,
    }: {},
    device: {
      browser: agent.family || 'Unknown',
      os: agent.os? `${agent.os.family} ${agent.os.major}` : 'Unknown',
    },
    behavior: {
      referrer, 
      timeSpent: 0,
      pagesVisited: [],
    },
  };


  try {
    const visitor = await Visitor.create(visitorData);
    res.status(201).json({
      success: true,
      visitor, 
      message: "Visitor information saved successfully."
    })
  }catch(error){
    console.log('Error saving visitor: ', error);
    res.status(400).json({
      success: false,
      visitor: null,
      message: 'Couldnot save visitor.'
    })
  }
})

export default router;