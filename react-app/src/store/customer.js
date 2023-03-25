const LOAD_OTHER_CUSTOMERS = "user/LOAD_OTHER_CUSTOMERS";

const loadOtherUsers = (customers) => {
  return {
    type: LOAD_OTHER_CUSTOMERS,
    customers,
  };
};


export const getAllCustomers = ()=>async(dispatch)=>{
    const res = await fetch(`/api/users/`)
    
    if(res.ok){
       const customers = await res.json()
   
       dispatch(loadOtherUsers(customers));
    
    }
    

}

const defaultState = {};

const customersReducer = (state = defaultState, action) => {
  let newState = { ...state };

  switch (action.type) {
  

    case LOAD_OTHER_CUSTOMERS:
      Object.values(action.customers.users).forEach((user) => {
        newState[user.id] = user;
      });

      return newState;

    default:
      return state;
  }
};

export default customersReducer;