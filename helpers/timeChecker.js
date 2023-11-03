export const timeChecker = (orderType, currentTime) => {
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

      // Calculate the starting hour based on the current time
      let startHourAsap = 8;
      if (
        nowAsap.getHours() > 8 ||
        (nowAsap.getHours() === 8 && nowAsap.getMinutes() >= 0)
      ) {
        startHourAsap = nowAsap.getHours();
      }

      // Generating Hours Array
      for (let hour = startHourAsap; hour < 20; hour++) {
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
      for (
        let minute =
          nowAsap.getHours() === startHourAsap ? nowAsap.getMinutes() : 0;
        minute < 60;
        minute++
      ) {
        minutesAsap.push(minute);
      }

      // Estimation Time Will Be After Payment Time By 40 Minutes
      const paymentTimeAsap = nowAsap;
      let estTimeAsap = new Date(paymentTimeAsap.getTime() + 40 * 60000); // 40 minutes later

      // Ensure 'est-time' is at least 8:40 AM
      // if (
      //     estTimeAsap.getHours() < 8 ||
      //     (estTimeAsap.getHours() === 8 && estTimeAsap.getMinutes() < 40)
      // ) {
      //     estTimeAsap.setHours(8);
      //     estTimeAsap.setMinutes(40);
      // }

      // Check if payment time is greater than or equal to 8:00 AM
      const isPaymentTimeValidAsap =
        paymentTimeAsap.getHours() >= 8 ||
        (paymentTimeAsap.getHours() === 8 && paymentTimeAsap.getMinutes() >= 0);

      return {
        days: daysAsap,
        hours: hoursAsap,
        minutes: minutesAsap,
        ampm: ampmAsap,
        // "est-time": estTimeAsap.toLocaleTimeString(),
        isPaymentTimeValid: isPaymentTimeValidAsap,
      };

    case "same_day":
      const nowSameDay = new Date(currentTime);
      const dateFormatter2 = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
      });
      const formattedDate = dateFormatter2.format(nowSameDay);

      const daysSameDay = [formattedDate];
      const hoursSameDay = [];
      const minutesSameDay = [];
      const ampmSameDay = ["am", "pm"];

      // Calculate the starting hour based on the current time
      let startHourSameDay = 8;
      if (
        nowSameDay.getHours() > 8 ||
        (nowSameDay.getHours() === 8 && nowSameDay.getMinutes() >= 0)
      ) {
        startHourSameDay = nowSameDay.getHours();
      }

      // Generating Hours Array
      for (let hour = startHourSameDay; hour < 21; hour++) {
        if (hour < 12) {
          hoursSameDay.push(`${hour} am`);
        } else {
          if (hour > 12) {
            hoursSameDay.push(`${hour - 12} pm`);
          } else {
            hoursSameDay.push(`${hour} am`);
          }
        }
      }

      // Generating Minutes Array
      if (
        (nowSameDay.getHours() === 4 && nowSameDay.getMinutes() === 0) ||
        (nowSameDay.getHours() >= 8 && nowSameDay.getHours() < 20)
      ) {
        for (let minute = 0; minute < 56; minute++) {
          minutesSameDay.push(minute);
        }
      } else {
        for (let minute = nowSameDay.getMinutes(); minute < 60; minute++) {
          minutesSameDay.push(minute);
        }
      }

      // If the current hour is 8:00PM, let the minutes be 30 only
      if (nowSameDay.getHours() === 20) {
        // Make Array Empty Again
        for (let minute = 0; minute < 60; minute++) {
          minutesSameDay.pop(minute);
        }

        for (let minute = 0; minute < 31; minute++) {
          minutesSameDay.push(minute);
        }
      }

      // Estimation Time Will Be After Payment Time By 40 Minutes
      const paymentTimeSameDay = nowSameDay;
      const estTimeSameDay = new Date(
        paymentTimeSameDay.getTime() + 40 * 60000
      ); // 40 minutes later

      // Ensure 'est-time' is at least 8:40 AM
      // if (
      //     estTimeSameDay.getHours() < 8 ||
      //     (estTimeSameDay.getHours() === 8 &&
      //         estTimeSameDay.getMinutes() < 40)
      // ) {
      //     estTimeSameDay.setHours(8);
      //     estTimeSameDay.setMinutes(40);
      // }

      // Define payment time conditions based on the current time
      let isPaymentTimeValidSameDay = false;
      if (
        (nowSameDay.getHours() >= 8 && nowSameDay.getHours() < 20) ||
        (nowSameDay.getHours() == 7 && nowSameDay.getMinutes() < 60) ||
        (nowSameDay.getHours() == 0 && nowSameDay.getHours() < 5) ||
        (nowSameDay.getHours() == 4 && nowSameDay.getMinutes() < 60)
      ) {
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

      const hoursPreOrder = [];
      const minutesPreOrder = [];
      const ampmPreOrder = ["am", "pm"];

      for (let hour = 1; hour < 25; hour++) {
        if (hour < 12) {
          hoursPreOrder.push(`${hour} am`);
        } else {
          if (hour > 12) {
            hoursPreOrder.push(`${hour - 12} pm`);
          } else {
            hoursPreOrder.push(`${hour} am`);
          }
        }
      }
      for (let minute = 0; minute < 60; minute++) {
        minutesPreOrder.push(minute);
      }

      // Set an arbitrary 'est-time' for pre-order
      const estTimePreOrder = new Date(currentTime); // Modify with your logic for 'est-time'

      // TODO: SET PAYMENT VALIATION AND ESTIMATION TIME
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
