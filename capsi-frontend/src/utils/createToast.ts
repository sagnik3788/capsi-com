import toast from "react-hot-toast";

export const createToast =(msg:string, type:string,)=>{

   toast.dismiss();
    if(type==='error'){
        return toast.error(msg, {
            duration: 5000,
            position: "top-right",
            style: {
                width: "15vw",
                borderRadius: "16px",
                fontSize: "16px",
                color: "#B1000F",
                backgroundColor: "#FFD4D8",
            },
        });
    }else if(type==='success'){
        return  toast.success(msg, {
            duration: 3200,
            position: "top-right",
            style: {
                width: "15vw",
                borderRadius: "16px",
                fontSize: "16px",
                color: "#016A1C",
                backgroundColor: "#E1FCDE",
            },
        });
    }
    
};