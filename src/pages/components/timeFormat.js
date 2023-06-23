export const handleSlice = (time) => {
  return time ? new Date(time).toString().slice(0, 21) : "Not Specified";
};
export const handleDeliveryTime = (time) => {
  return time ? new Date(time).toString().slice(0, 21) : "Not Specified";
};



function TimeFormat() {
  return (
    <div>TimeFormat</div>
  )
}

export default TimeFormat