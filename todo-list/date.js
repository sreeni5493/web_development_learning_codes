exports.getDate = function(){
    
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let date = today.toLocaleDateString("en-IN", options)
    return date;
};
exports.getDay = () =>{
    let today = new Date();
    let currentDay = today.getDay();
    let day = "";
    switch (currentDay) {
    case 0:
        day = "Sunday";
        break;
    case 1:
        day = "Monday";
        break;
    case 2:
        day = "Tuesday";
        break;
    case 3:
        day = "Wednesday";
        break;
    case 4:
        day = "Thursday";
        break;
    case 5:
        day = "Friday";
        break;
    case 6:
        day = "Saturday";
        break;
    default:
        day = "NewDay";
        break;
    }
    return day;
};


