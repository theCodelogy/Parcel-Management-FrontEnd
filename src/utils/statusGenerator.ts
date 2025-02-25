type TPayload<T> = {
    title: string;
    statusDetails: T;
  };
const user = {
    name:"Fahim Hasan",
    email:"fahim@gmail.com",
    phone:"01615004256"
}
// Declare T as a generic for the function
export const generateStatus = async <T extends Record<string, unknown>>(payload: TPayload<T>) => {
    if(payload.title=="Parcel Create"){
        return {
            title:payload?.title,
            name:user?.name,
            email:user?.email,
            phone:user?.phone,
            current:true,
            date:Date.now()
        }
    }else if(payload.title=="Pickup Assigned"){
        const res= await fetch(`https://parcel-management-back-end.vercel.app/api/v1/deliveryMan?name=${payload.statusDetails.pickupMan}`, {
            method: 'GET',
        })
        const data = await res.json();
        const deliveryMan = data.data[0];
        return {
            title:payload?.title,
            current:true,
            deliveryMan:deliveryMan?.name,
            deliveryManPhone:deliveryMan?.phone,
            deliveryManEmail:deliveryMan?.email,
            note:payload.statusDetails?.note,
            createdBy:{
                name:user?.name,
                email:user?.email,
                phone:user?.phone,
            },
            date:Date.now()
        }
    }else if(payload.title=="Recived By Hub"){
        return {
            title:payload?.title,
            current:true,
            createdBy:{
                name:user?.name,
                email:user?.email,
                phone:user?.phone,
            },
            date:Date.now()
        }
    }else if(payload.title=="Delivery Man Assigned"){
        const res= await fetch(`http://localhost:5000/api/v1/deliveryMan?name=${payload.statusDetails.deliveryMan}`, {
            method: 'GET',
        })
        const data = await res.json();
        const deliveryMan = data.data[0];
        return {
            title:payload?.title,
            current:true,
            pickupMan:deliveryMan?.name,
            pickupManPhone:deliveryMan?.phone,
            pickupManEmail:deliveryMan?.email,
            note:payload.statusDetails?.note,
            createdBy:{
                name:user?.name,
                email:user?.email,
                phone:user?.phone,
            },
            date:Date.now()
        }
    }else if(payload.title=="Delivered"){     
        return {
            title:payload?.title,
            current:true,
            note:payload?.statusDetails.note,
            createdBy:{
                name:user?.name,
                email:user?.email,
                phone:user?.phone,
            },
            date:Date.now()
        }
    }
};