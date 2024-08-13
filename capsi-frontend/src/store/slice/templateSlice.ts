const templateSlice = (set: any, get: any) => ({
  captionStyles: [
    {
      tempNo: 1,
      style: {
        fontFamily: "var(--robotoblack)",
        fontSize: "25px",
        color: "#ffff00",
        transform: "translate(-50%, -50%) scale(1.2)",
        textShadow: "2px 2px 0px rgba(0,0,0)",
        WebkitTextStrokeWidth: "0.03em",
        WebkitTextStrokeColor: "black",
      },
    },
    {
      tempNo: 2,
      style: {
        fontFamily: "var(--robotoblack)",
        fontSize: "18px",
        color: "#FFFFFF",
        borderRadius: "2px",
        transform: "translate(-50%, -50%) scale(1)",
        opacity: 1,
        letterSpacing: "1px",
        textShadow: "0px 0px 2px rgba(0, 0, 0, 0)",
        WebkitTextStrokeWidth: "0px",
        WebkitTextStrokeColor: "rgba(0, 0, 0, 0)",
      },
    },
    {
      tempNo: 3,
      style: {
        fontFamily: "var(--komika)",
        fontSize: "24px",
        color: "#FFFFFF",
        textShadow: "-0.06em 0 black, 0 0.06em black, 1px 0 black, 0 -0.06em black",
        WebkitTextStrokeWidth: "1px",
        WebkitTextStrokeColor: "black",
      }},
    {
      tempNo: 4,
      style: {
        fontFamily: "var(--robotoblack)",
        fontSize: "18px",
        color: "#000000",
        backgroundColor: "#FFD100",
        paddingTop:'10px',
        paddingBottom:'10px',
        borderRadius: "1px",
        transform: "translate(-50%, -50%) scale(1.2)",
        opacity: 1,
        letterSpacing: "1px",
        WebkitTextStrokeWidth: "0px",
      },
      
    },{
      tempNo: 5,
      style: {
        fontFamily: "var(--thebold)",
        fontSize: "18px",
        color: "#ffffff",
        transform: "translate(-50%, -50%) scale(1.8)",
        opacity: 1,
        WebkitTextStroke: "0.02em black ",
        textShadow: "-0.05em -0.05em 0 black, 0.05em -0.05em 0 black, -0.05em 0.05em 0 black, 0.05em 0.05em 0 black",
      },
      
    },{
      tempNo: 6,
      style: {
        fontFamily: "var(--theopinionpro)",
        fontSize: "24px",
        textShadow: " 0.09em 0.09em 0 #000",
        transform: "translate(-50%, -50%) scale(1.5)",
        WebkitTextStroke: "0.01em black ",
      },
      
    },
  ],
});
export default templateSlice;
