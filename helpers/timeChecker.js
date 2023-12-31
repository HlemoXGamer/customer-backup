export const timeChecker = (orderType, currentTime) => {
    // Function to convert 24-hour time to 12-hour format
    // const convertTo12Hour = (time24) => {
    //     const [hours, minutes] = time24.split(':').map(Number);
    //     const suffix = hours >= 12 ? 'pm' : 'am';
    //     const hours12 = hours % 12 === 0 ? 12 : hours % 12;
    //     return `${hours12} ${suffix}`;
    // };

    // const removeHours = (hoursArray, timeRanges) => {
    //     // Convert time ranges to 12-hour format before processing
    //     timeRanges.forEach(range => {
    //         if (range.status === 0) {
    //             const from = convertTo12Hour(range.from);
    //             const to = convertTo12Hour(range.to);
    //             const fromIndex = hoursArray.indexOf(from);
    //             const toIndex = hoursArray.indexOf(to);
    //             console.log({hoursArray});
    //             if (fromIndex !== -1 && toIndex !== -1) {
    //                 hoursArray.splice(fromIndex, 2);
    //             }
    //         }
    //     });
    // };

        // Function to convert 24-hour time to 12-hour format
        const convertTo12Hour = (time24) => {
            const [hours, minutes] = time24.split(':').map(Number);
            const suffix = hours >= 12 ? 'pm' : 'am';
            const hours12 = hours % 12 === 0 ? 12 : hours % 12;
            return `${hours12} ${suffix}`;
        };

        // Function to generate the range of hours between 'from' and 'to'
  const generateRangeHours = (from, to) => {
    let hoursArray = [];
    let start = parseInt(from.split(':')[0]);
    let end = parseInt(to.split(':')[0]);
    for (let hour = start; hour < end; hour++) {
      let hourFormatted = convertTo12Hour(`${hour}:00`);
      hoursArray.push(hourFormatted);
    }
    return [...new Set(hoursArray)];
  };
        // Function to remove hours based on status
        const removeHours = (timeRanges, orderType) => {
          let hoursArray = [];
          const currentTime = new Date().getHours(); // get current hour (0 - 23)

          timeRanges.forEach(range => {
            const rangeToHour = parseInt(range?.to?.split(':')[0]); // split by ":" and get the hour part
            console.log(rangeToHour)
            if (orderType == 'same-day') {
              if (range.status === 1 && range.is_active === 1 && currentTime < rangeToHour) {
                const rangeHours = generateRangeHours(range.from, range.to);
                hoursArray = [...hoursArray, ...rangeHours];
              }
            } else {
              const rangeHours = generateRangeHours(range.from, range.to);
              hoursArray = [...hoursArray, ...rangeHours];
            }
          });

    return hoursArray;
  };
    const timeRanges = localStorage.getItem('timeSlots') ? JSON.parse(localStorage.getItem('timeSlots')) : []
    // const timeRanges = [
    //     { from: "8:00",  to: "10:00", status: 1, is_active: 0 },
    //     { from: "10:00", to: "12:00", status: 1, is_active: 0 },
    //     { from: "12:00", to: "14:00", status: 1, is_active: 0 },
    //     { from: "14:00", to: "16:00", status: 1, is_active: 1 },
    //     { from: "16:00", to: "18:00", status: 0, is_active: 1 },
    //     { from: "18:00", to: "20:00", status: 0, is_active: 1 },
    // ];
  console.log(timeRanges)
    switch (orderType) {
        case "asap":
            // Initialization Phase
            const nowAsap = new Date(currentTime);
            const todayAsap = nowAsap.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "2-digit",
            });
            const daysAsap = [todayAsap];
            const hoursAsap = [];
            const minutesAsap = [];
            const ampmAsap = ["am", "pm"];

            // Calculate the starting hour and minutes based on the current time
            let startHourAsap = 8;
            let startMinuteAsap = 0;
            if (
                nowAsap.getHours() > 8 ||
                (nowAsap.getHours() === 8 && nowAsap.getMinutes() >= 45)
            ) {
                startHourAsap = nowAsap.getHours();
                startMinuteAsap = nowAsap.getMinutes() + 45;
                if (startMinuteAsap >= 60) {
                    startHourAsap += 1;
                    startMinuteAsap -= 60;
                }
            }

            // Generating Hours Array
            for (let hour = startHourAsap; hour < 21; hour++) {
                if (hour < 12) {
                    hoursAsap.push(`${hour} am`);
                } else {
                    if (hour > 12) {
                        hoursAsap.push(`${hour - 12} pm`);
                    } else {
                        hoursAsap.push(`${hour} pm`);
                    }
                }
            }

            // Generating Minutes Array
            for (let minute = startMinuteAsap; minute < 60; minute++) {
                minutesAsap.push(minute);
            }

            // Estimation Time Will Be After Payment Time By 40 Minutes
            const paymentTimeAsap = nowAsap;
            let estTimeAsap = new Date(paymentTimeAsap.getTime() + 40 * 60000); // 40 minutes later

            // If the current hour is 8:00PM, let the minutes be 30 only
            if (nowAsap.getHours() === 20) {
                // Make Array Empty Again
                for (let minute = 0; minute < 60; minute++) {
                    minutesAsap.pop(minute);
                }

                for (let minute = 0; minute < 31; minute++) {
                    minutesAsap.push(minute);
                }
            }

            // Ensure 'est-time' is at least 8:40 AM
            if (
                estTimeAsap.getHours() < 8 ||
                (estTimeAsap.getHours() === 8 && estTimeAsap.getMinutes() < 40)
            ) {
                estTimeAsap.setHours(8);
                estTimeAsap.setMinutes(40);
            }

            // Check if payment time is greater than or equal to 8:00 AM
            const isPaymentTimeValidAsap =
                paymentTimeAsap.getHours() >= 8 ||
                (paymentTimeAsap.getHours() === 8 &&
                    paymentTimeAsap.getMinutes() >= 0);
            removeHours(hoursAsap, timeRanges);
            return {
                days: daysAsap,
                hours: hoursAsap,
                minutes: minutesAsap,
                ampm: ampmAsap,
                "est-time": estTimeAsap.toLocaleTimeString(),
                isPaymentTimeValid: isPaymentTimeValidAsap,
            };

        case "same-day":
            // Initialization Phase
            const nowSameDay = new Date(currentTime);
            const dateFormatter2 = new Intl.DateTimeFormat("en-US", {
                weekday: "short",
                month: "short",
                day: "2-digit",
            });
            const formattedDate = dateFormatter2.format(nowSameDay);

            const daysSameDay = [formattedDate];
            const today = new Date().toISOString().slice(0, 10); //Current day
            const todaysTimeSlots = timeRanges.filter(slot => slot.day === today);
            const hoursSameDay = removeHours(todaysTimeSlots, 'same-day');
            const minutesSameDay = [];
            const ampmSameDay = ["am", "pm"];

            // Calculate the starting hour and minutes based on the current time
            let startHourSameDay = 8;
            let startMinuteSameDay = 0;
            if (
                nowSameDay.getHours() > 8 ||
                (nowSameDay.getHours() === 8 && nowSameDay.getMinutes() >= 45)
            ) {
                startHourSameDay = nowSameDay.getHours();
                startMinuteSameDay = nowSameDay.getMinutes() + 45;
                if (startMinuteSameDay >= 60) {
                    startHourSameDay += 1;
                    startMinuteSameDay -= 60;
                }
            }

            // Generating Hours Array
            // for (let hour = startHourSameDay; hour < 21; hour++) {
            //     if (hour < 12) {
            //         hoursSameDay.push(`${hour} am`);
            //     } else if (hour === 12) {
            //         hoursSameDay.push(`${hour} pm`);
            //     } else {
            //         hoursSameDay.push(`${hour - 12} pm`);
            //     }
            // }

            // Generating Minutes Array
            let lastHour = hoursSameDay[hoursSameDay.length - 1];
            lastHour = parseInt(lastHour);
            let lastMinute = 30; // Set the latest minute to 30
            for (
                let minute = startMinuteSameDay;
                minute <= lastMinute;
                minute++
            ) {
                minutesSameDay.push(minute);
            }

            // Estimation Time Will Be After Payment Time By 40 Minutes
            const paymentTimeSameDay = nowSameDay;
            let estTimeSameDay = new Date(
                paymentTimeSameDay.getTime() + 40 * 60000
            ); // 40 minutes later

            // Get the current date and time
            let currentDate = new Date(currentTime);

            // Set the start and end times for the range (12:00 AM to 4:55 AM)
            let startTime = new Date(currentDate);
            startTime.setHours(0, 0, 0, 0); // Set to 12:00 AM

            let endTime = new Date(currentDate);
            endTime.setHours(4, 55, 0, 0); // Set to 4:55 AM
            // Define payment time conditions based on the current time
            let isPaymentTimeValidSameDay = false;
            if (
                (nowSameDay.getHours() >= 8 && nowSameDay.getHours() < 20) ||
                (nowSameDay.getHours() === 7 && nowSameDay.getMinutes() < 60) ||
                (nowSameDay.getHours() === 0 && nowSameDay.getMinutes() < 5) ||
                (nowSameDay.getHours() === 4 && nowSameDay.getMinutes() < 60)) {
                isPaymentTimeValidSameDay = true;
            }

            if(currentDate >= startTime && currentDate <= endTime){
                isPaymentTimeValidSameDay = true;
            }

            return {
                days: daysSameDay,
                hours: hoursSameDay,
                minutes: minutesSameDay,
                ampm: ampmSameDay,
                "est-time": estTimeSameDay.toLocaleTimeString(),
                isPaymentTimeValid: isPaymentTimeValidSameDay,
            };

        case "pre-order":
            // Initialize current time to tomorrow
            const nowPreOrder = new Date(currentTime);
            nowPreOrder.setDate(nowPreOrder.getDate() + 1); // Set to tomorrow
            const daysPreOrder = [];
            const dateFormatter = new Intl.DateTimeFormat("en-US", {
                weekday: "short",
                month: "short",
                day: "2-digit",
            });

            for (let i = 0; i < 365; i++) {
                const formattedDate = dateFormatter.format(nowPreOrder);
                daysPreOrder.push(formattedDate);
                nowPreOrder.setDate(nowPreOrder.getDate() + 1); // Move to the next day
            }

            const hoursPreOrder = removeHours(timeRanges);
            const minutesPreOrder = [];
            const ampmPreOrder = ["am", "pm"];

            // Define the range of time (from 8:00 AM to 8:30 PM)
            const startHour = 8;
            const endHour = 20; // 8:30 PM is the same as 20:30 in 24-hour format

            // for (let hour = startHour; hour <= endHour; hour++) {
            //     if (hour < 12) {
            //         hoursPreOrder.push(`${hour} am`);
            //     } else if (hour === 12) {
            //         hoursPreOrder.push(`${hour} pm`);
            //     } else {
            //         hoursPreOrder.push(`${hour - 12} pm`);
            //     }
            // }

            // Limit minutes to 30 for the latest hour (8:30 PM)
            const latestHour = currentTime.slice(11,13) == 20 ? 30 : 59;

            for (let minute = 0; minute <= latestHour; minute++) {
                minutesPreOrder.push(minute);
            }

            // Set an arbitrary 'est-time' for pre-order
            const estTimePreOrder = new Date(currentTime); // Modify with your logic for 'est-time'

            return {
                days: daysPreOrder,
                hours: hoursPreOrder,
                minutes: minutesPreOrder,
                ampm: ampmPreOrder,
                // "est-time": estTimePreOrder.toLocaleTimeString(),
                isPaymentTimeValid: true, // Modify as needed
            };

        default:
            return null;
    }
};
