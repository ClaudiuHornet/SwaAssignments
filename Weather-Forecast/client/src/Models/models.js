//Q1 and Q2
    //FACTORY FUNCTIONS
export const sharedData = (place, type, unit, time) => {
    const getPlace = () => place
    const getType = () => type
    const getUnit = () => unit
    const getTime = () => time
    return { getPlace, getType, getUnit, getTime }
}
            // CONSTRUCTORS
            //  or alternatively 1.
            // const Data = (place,type,unit,time) => {
            //     this.place = place
            //     this.type = type
            //     this.unit = unit
            //     this.time = time
            // }
            // 2.
            // Data.prototype.getPlace = ()=> this.place
            // Data.prototype.getType = ()=> this.type
            // Data.prototype.getUnit = ()=> this.unit
            // Data.prototype.getTime = ()=> this.time

export const historicalData = ({data, value, type, unit, time, place, direction, precipitation_type}) => {
    if(data === undefined) data = sharedData(place, type, unit, time)
            //3.
            // data = new Data(place,type,unit,time)

                //DIRECT OBJECT CREATION
                // or alternatively
                //1.
                // let dataE = {
                //     place:place,
                //     type:type,
                //     unit:unit,
                //     time:time
                // }
                //2.
                // dataE.prototype.getPlace = ()=> this.place
                // dataE.prototype.getType = ()=> this.type
                // dataE.prototype.getUnit = ()=> this.unit
                // dataE.prototype.getTime = ()=> this.time

                //Prototypical
                // data = Object.create(dataE)
                // data.place = place
                //Concatenative
                // data = {...dataE}
                // data.place = place


    const getValue = () => value
    const getDirection = () => direction
    const getPrecipitationType = () => precipitation_type
    ///Also concatinative
    return { getValue, data, getDirection, getPrecipitationType}
}



export const forecastData = ({data, from, to, place, type, unit, time, precipitation_types, directions}) => {
    if(data === undefined) data = sharedData(place, type, unit, time)
    const getPrecipitationTypes = () => precipitation_types
    const getDirections = () => directions
    const getFrom = () => from
    const getTo = () => to
    return { getFrom, getTo, getPrecipitationTypes, getDirections, ...sharedData(place, type, unit, time)}
}