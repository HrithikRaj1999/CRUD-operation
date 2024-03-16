export function ConvertDateIntoReadible(normalDate: string) {
    try {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZoneName: "short",
      };
  
      const date = new Date(normalDate);
      // Additional validation to ensure date is valid
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
  
      const formattedDate = new Intl.DateTimeFormat("en-IN", options).format(date);
      return formattedDate;
    } catch (error) {
      console.error("Error formatting date:", error);
      // Return a default value or indicate an error in a way that suits your app
      return "Invalid date";
    }
  }
  