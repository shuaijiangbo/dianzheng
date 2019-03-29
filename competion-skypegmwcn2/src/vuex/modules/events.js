import {get, post} from '@/api/fetch.js';
import url from '@/api/serviceAPI.config.js';


const event={
  state:{
    eventId:1,
    eventName:''
  },
  mutations:{
    saveEventId(state,events){
      state.eventId=events.id;
      state.eventName=events.name;
    }
  },
  actions:{

  }
}

export default event
