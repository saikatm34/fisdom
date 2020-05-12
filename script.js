window.onload = () => {

    // Declarations.
    let cardInput = document.getElementById("CardNumber");
    let cardDisplay = document.getElementById("CardImage");
    let cardCVV = document.getElementById("CardCVV");
    let cardExpiry = document.getElementById("CardExpiry");
    let cardForm = document.getElementById("creditCard");
    let SavedCards = document.getElementById("SavedCards");
    let saveForLater = document.getElementById("BtnSubmit");

    let specialKeyCodes = {
      UNKNOWN: 0,
      BACKSPACE: 8,
      PAGE_UP: 33,
      ARROW_LEFT: 37,
      ARROW_RIGHT: 39,
    };

    let cards = [
      {
        type: "visa",
        pattern: /^4[0-9]{12}(?:[0-9]{3})?$/,
        length: 16,
        cvcLength: 3,
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAmCAYAAACRWlj1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE0NjY2MDY0RkI2RDExRTJBNDA5Rjg3MDJBQzkxMjk5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE0NjY2MDY1RkI2RDExRTJBNDA5Rjg3MDJBQzkxMjk5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkFGNUY4RUJGQjZDMTFFMkE0MDlGODcwMkFDOTEyOTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkFGNUY4RUNGQjZDMTFFMkE0MDlGODcwMkFDOTEyOTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4NV0TbAAAIsklEQVR42txZW2we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",
      },
      {
        type: "mastercard",
        pattern: /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
        length: 16,
        cvcLength: 3,
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAmCAYAAACRWlj1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE0NjY2MDY4RkI2RDExRTJBNDA5Rjg3MDJBQzkxMjk5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE0NjY2MDY5RkI2RDExRTJBNDA5Rjg3MDJBQzkxMjk5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTQ2NjYwNjZGQjZEMTFFMkE0MDlGODcwMkFDOTEyOTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTQ2NjYwNjdGQjZEMTFFMkE0MDlGODcwMkFDOTEyOTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4fyTghAAALD0lEQVR42oRZXYhd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",
      },
      {
        type: "amex",
        pattern: /^3[47]/,
        length: 15,
        cvcLength: 4,
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAmCAYAAACRWlj1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZBRjVGOEU1RkI2QzExRTJBNDA5Rjg3MDJBQzkxMjk5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZBRjVGOEU2RkI2QzExRTJBNDA5Rjg3MDJBQzkxMjk5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkFGNUY4RTNGQjZDMTFFMkE0MDlGODcwMkFDOTEyOTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkFGNUY4RTRGQjZDMTFFMkE0MDlGODcwMkFDOTEyOTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4msVk1AAALYElEQVR42rRZa6hcVxVe68yZmfu+NzfPtkkTbZPU5tVHkvqjpdYHiKD+kKJ/LNYfoWh+FIpSDEKhUEEsIv4oVLEopT9ViD8UxdJatd5camygaWMktaa9MTfN4z5n7syc5Vr7ufY5J1IETzJ35py9z9577fWtbz02Hv3T5cZEu/FEhvAVAtiaIQLxP0D+L19yT+4eXJu/CM1XIe3kW6S/3BbA//kZht/g26Fwffh3IW+R66fGdn3VZOqeSn0oaeXv83z/080jjSfy8XbjqSyjbyJk9kVuzaJ05lHWwDi+E8ot0/zOzJ3tXvCC0fdDL3IGlJFp04sSKTFDIyg3+qexvUaQ9Hf8RiU4j7qV/x67sDxo5o2MHjYL4H9ee4hZsh3meVis0yIvyghi7ih0z7KocZBxeOFGeegEVuuWZiqvuVaQ8kU1bVRp5ykfzlm4jeAWaNaAVgS7YicEea34RRm8WmjKD4GnfBXgoOwUTRYFZrwACHLgyAK0tb6QG6lOporQ5HBkf2NF0wTdAW3M7eZigKffnEw/8/bnNJYARCCcyWILsChHKNzUiQnJM7cxRudOMPAaJ7cRlYWigp4fMgqBlX5iOgirvQIGfJubCXnXGuhsMLM7HewnvE8Qrc9pHNDaIVGELgblWzWSB7FXIRmhZHjZFCrDsgLTqDmskE21X4elWhsUoX9udoEwvINOo6gF1OTl7UjBjZyGzXSFE5bcC2hbPFta+lR68kJDlP+D2Vjar88yMSRhUMQ24gENEo3y0NqZ4Re0i7TQtSxo7TELC5F2eVlY0Gvc3jvBw56Resf+QM/OimWC1rHOLWAJuqn76AwAVgwklVm4tedu+51AFHgSMN2hQDbCuFg4bdRsrhHcK4qiH9WgQs9NcUHGxVDUqn2Haggm3g94oNX+QIi61C2iIo8SK8ZTmvNQBf8OekLw0CTwLrS4jqOOrKoE0/ECRSsjojSYqPWD3tboOl4k7JS4Le/PILJm1Z9YSGbK1mrgg4F9rRCIJUesiLmMNIoEEExDQ9QL3eevpZ4TTtlxfMfZNTqSoev4EGN3RqsUNRyiE1Q7RyVvFTVuoh2CNASTKby/1OMBuEiHaplU7lZZup4jsehX4/ge2hH6NoRRA+p40c1VxPgyyEMeBrUeOQhJwceWNW18k/OHKRFRkDeO3ee+ojXmkSQeJh9IlDSo4Z77YTKPXYQkUtCTJj4Lq1Rugmuq2o1Mru2zoDrb8fNFjYognb64AApaojIUSxpMZuf7HELGoL4dJOPm2gV9dH0TPr6xBR/kkkU9/cYSLPPOP7Z/HCabGfwv1ztLffjOiasw1mrAsYNTMNWujnP83Ar8/Oxy0Ch4oiLn6Ekpw+Na7ASzaKE5Nxxe14Ql3tG3eFK5ppoIt4yaaA8WGD9nFgszcJv9xP6pHA5vaMGF1YER7sxiHy6v2vzj5tEMbuL3Zi6uQc/HooVnZTBOWzZoeiiDO3mMI3sn4MbRBoxw5Pziux1j1/t5szcON+CVuQ78goWDSrRpB8u1vXkNRr8HAYo7xxswxhP89mIXZt5fM00t7vTorlFosUBznQKOn191EQvApt2jcHBDE652G7DGz17gRayuWVR8etuwEfCX55YNBH2A0+MQa5XZ8TM7RuE3/1wxgn51zzjce0MbJPp6+uQ1OM1zH9rShgduGoLZ+TV4jlGizDhC2enM2iC5VIlS444ET0Z7MuHJKz0Y4r67Jprm98mrfTg83QxWM8xaXWFB/sAb8eD2ERjPM5jhhYggQ9y2ulYk/lg25+v7xo1WvKPnRBW2T+TwzOsL8LPTS7BpJIPf/WvVCLeL5zqyZwLOXuvBs6cWHPoSJxttU7jFO13PAZ4oiPxvgi1DDdjKcPgbDyoO9sC6Nhyazk2fmUtdcIg2/XfzwsZYkFOXe7DYtyHGn1nYBk96D9svaUdMNn78x0LffN5eHMA5hrK4g4Pc96HbxgxUvzt7DWYvrMGOyRY8emAS5lYG8P2/XjMug/xiIwsCKR7PfSpeGFsgFx8qf8Zfd7P25JrlRcv9XesaMN3KYMswQ3OF4O+L/bBjEhodYrv5/XtdeJkXtWcyh7nlAdzOY0y1Gw4RdoeX+bVltt3n31xyEYxd5NQdk7B+qAX3Mwxfm+/B67yJsrZH9o7BMJuJaM5AGzVxUClqIMeiKsG0Prhw0Yr1N2Nspfsmm/AOr+YC75z0+vHZFZMm9QZgAlyxybunW+Gdeza04aW5LsxeWoOLq32z8I+xHZ3n92WuvsNin4PIZiODrzGJWAzYte0Yt8T14rtdODXfgbyBbIMIP3ljEb5x5xQ8dPsYfO+1BZsWIYYgPvHDLsDISNVOZHIJXAsfDXDbHetazKAAr77fM5NvH8tgOxPEDma1WycazJgZvHWFGbJbmFRTrlF+YT9rTHZZ2raNNeBm3imB8ErfRf0B17yJTXknM58x/gicZxnWz59egDaPdezQFOxlwjrDNv+j04twK2/4kb3jNix0xa5ALt7HOuefewgjqtyN7FJzzhoOMx2LLb3JZMIywZd3jEBD+dPjTNt/Ybo/Md91wY1tvHdzi1mua+a6j1lPLmHT3iCG0tK1y37yyZkrwe7l+sT2YXjpfAcavHlHD0wYjR7dNwFPsj+cYbcwzVD/4s4R+BIz9QtMQgk8PVyd4LkvHViFUcgF5bqNd0pYUHzZA1uGYDPbnAj3KxZqnpOwB3kh921qcR8MY9w4YuG1mUnpCx8aMY5+/7S14VuYgD7/4RHYPWXvP8ftvSKldh9mfZb77WSm/gi/+/J7HdjF7zx21yT8cc76wUVm409tHWbfSvDrt5dVeROTAAsfP3GFQmKLEcoyyRH2cdtEbeq6xFD8AcNEBrj/hiH4pNPO/+t69d9dQyqb2Sy+zVAVZ18O8J7h9hMXutUigCDy8ZmrBBALu76cF+3WFVbr42pXSYtJrTj6gsQXDmDgViBZQmonsTQRIsG6KkWZHf97iqjyWAjuKC90ySDEOugyCEocZ8wnY1JsrNUxlhCW5GldptcCdM1TajJFzEV93beyeaUVU7UiEIQulU9RVca1zLkpEvnqMkanb6P6qJU0lXHsVVCoHUr+2WEyEupPsim0pXstXBoxYYx/y9rSdqWF9WvAmDv61EyPE1g0RNc+kUW1NW7AeLYAoR7pHbPRWr9w5wthtWEyUumPl56ohIY6KJY0R0SJI48lmhJJqcTXBtsDq8XClQFt73hW4WU3u+2iHLEreWy05nwmxaqRO6OwO2o1rQV3BeCC4gLroFdjhzoHTA6DMCYMQUggV7JADHCjYB+xfJBhrGt6RTKHwJpoLckhUcWG4MI/nZTGDJ7UyRWWoJhWT2ogmlTeFLmgyvLdIHk8KPEKwwo8CiulCfcl8Or0bK0FnaZCgKveiWiiciysbDkNsVLlpWdNUCIbKkMZ647fXF20UBWwUA1T/tDbDrtAozlfny/sAaAK1hWRqKTMvF+U6ocUD2gI0lyuLBT5M4gaskHF9mGzKAbiecwaYgdjP17l/OkPpDYygEIVjojKh47aFzoIYaFIxz9Pw6m0rO1JmUrCKijXnc0owey8cS15YMcE3y7wJokfi1iDRF3vxLAY0GzpbC0UlhCCTy3TONRtTsWZR/tMqmmlzKHi6N0GiAbnuf/GDFXJkBsGLJgkt0Ws/0HknTRJhkAg2uir0U9i7zVlhoQl645Caw98Y+WOSkEIf1/kdAmei7AQeIpgBSejhTmpSTJ8F32Qz6SRAlRj6QBcO6qTI4q1S6o5ndb+S/tPf4ao2LZ6fq+flwelZ/OFbvGtyXYmyd4jnGCvlxwunqVD6kx1FOFdAOpwTGXZCXxtphKREKm8wnwUbV9XFlL/lsSBUfiIqHn++0P+PPUfAQYAw9x454xy72YAAAAASUVORK5CYII=",
      },
      {
        type: "discover",
        pattern: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        length: 16,
        cvcLength: 3,
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAmCAYAAACRWlj1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZBRjVGOEU5RkI2QzExRTJBNDA5Rjg3MDJBQzkxMjk5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZBRjVGOEVBRkI2QzExRTJBNDA5Rjg3MDJBQzkxMjk5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkFGNUY4RTdGQjZDMTFFMkE0MDlGODcwMkFDOTEyOTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkFGNUY4RThGQjZDMTFFMkE0MDlGODcwMkFDOTEyOTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5oHbstAAAFLElEQVR42tyZX0wcRRzHv7Oc5oC+CNYcf2JMyj0VeCvhDZJLlAdDAm8EHxTBxKcmRh6svmhiH0kVjYkQGrWW1Bj6gsGUECGYAic1pBRytWelTWkLLcRAkbuW23Fm9mZv9jju9m53rWXIsjsz7Mx85vv7/WZmIfF43Ecp/ZQQ8gaASriYWLuO6h2ke+w6x5hOkVgsdoY9nPSqp2wQHgLK9BlhCj5kD+Ve9vIUITc4oOfT+LQAedsa/oPEXKCgOidJ13UB6MMhSxxKtYpDBchVS0++QsyrEL/h7Xjlb+mqqUkrxHfc9hsn7UlfOyhphXbqVXDIR7VMJpm3if7fg0iupB1muGdGwULAnhkFncBlVZA3mi2QeL1RdgpmS8GDOnAbLr09t+Bs+SDvKBqNYnBw0CxraGhAfX29KGtpacHk5CTYsUvUdXZ2orKyEv39/WZZW1sbThwLQB89DfIgCrxUg3joPXzyxVnU1NSgq6sLQ0NDWFhYQF1dHcbHx82+QqEQJiYmzHxPT48oc9UHd3d3xZ3D8CscDiMSiZj1HKSqqgplZWViwBKut7dX5FdXV0F/Og0t8QhaXQhFgVfw/Py34h0+ebz96elplJSUYHt7W7TZ2Ngorp2dHROstLQUAwMD3gWZ6upqNDc3i+fNzU1LHYfgZWNjYwKOg5WXlwtF29vbgfUbIFXH4at9DUXHX0WR/wiampoEUF9fnwBpbW0125udncXi4qKZ52D8bzi0bdO/Gc5vmeCmODIyIp4rKiqwvLwsIPx+P4LBoBgQh5TKcNipqSmRf/doEAQkuQtinR8pR21tLdbW1sQlVeNg8pknqSA3Xd6+OglZ4RJPQC5+kJ+CfNAcgKsYCASMI/PGhlBMzjav6+7uFtAcTpq29vop6PFH2Lt2CfE/LkMPhoR/S5B0ZTiohOWpo6ND3IeHh21tFSnzd9yZhWsneu5HxcXF+8o4hFqu7h+9Wmr02fPQLrxjTISXnyxUgEyh3wtAOj8CMvwWkNjzdiejDj7TkcYLOH3ya5Dzb7IHBsctmHi0F5WDd3PBztrf3mNg5CNoM1+yjDzPGb98ubZkhcJlO6u5CU0frgDf9IDcuWxQWVCSH51kh05AM6mWafJcg9MT0KcGoP38MfB4S8ClOA7Yqqmd24HNFUS8gqMrV9ga9yG029PgTcp+Uv1Rw1RZ3mdHkZxrjg1fcwOObtwG2JaPLHzPMrqiFlWZDDXZD7HzXTTXkSnbiUO+6xROX78JMvE5yPx3LBNXR5fsJxlUqBldkn07+PCbSzU34Oit34FfvoJ29QITLJHc41GkpKOmYuYW0GJxJH9Au6G/YDC2ndPnL4LMnGVbrTkTgFjgZB9yNaCmhOkGl9cy4ZmvcX+KzoBe+ZH51w/QYn8bchBpgkkAE9K4m/4myhQ1jchjf5k4CMyRnzGTowwKV0dBFkeBrRUoMdBUa9+gU9aXKiKWN1MTQbIsExI4G1zeYNsPQK9PA0uXgOvs+mfN4k/S5IgMGEQNJCQFkPxDokKptotU0OGAG8jwD1C7X46zWt4WA/gzDLISBr3xK8j930TohnW+zUioBgzY8Zp9E5BmVcVHdQ54jl0nnX70EQfMuxHoK/MgtxjIXwxsM6LMNklNPrGMTxEhJZ0YaFJdM8AQZVlQpkk1UUvdsaY5H6t8n730hGXfZvcXbEVIZmpYXTKue+y6uwSyfo0dUWLseKI4h6UtYyUmin9kHHBaPCGqX6UtPwRWeza79b9I8fKJOfieC/0rwAAaZEKBgnKv9wAAAABJRU5ErkJggg==",
      },
    ];

    let ristrictToNumber = (event) => {
      // Key event is for a browser shortcut
      if (event.metaKey || event.ctrlKey) {
        event.stopImmediatePropagation();
        return;
      }

      // If keycode is a special key press
      if ([specialKeyCodes.UNKNOWN, specialKeyCodes.ARROW_LEFT, specialKeyCodes.ARROW_RIGHT].indexOf(event.which) > -1) {
        event.stopImmediatePropagation();
        return;
      }

      let input = String.fromCharCode(event.which)

      // Check for number.
      if (!/^\d+$/.test(input)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };

    // Method to ger card details based on card number.
    let getCardFromNumber = (number) => {
        let num = (number + '').replace(/\D/g, '');
        for (const card of cards) {
            if (card.pattern.test(num)) {
                return card;
            }
        }
    };

    // Method to set and reset card image.
    let setImage = (card) => {
        if (card && card.image) {
            cardDisplay.style.display = "block";
            cardDisplay.src = card && card.image;
        } else {
            cardDisplay.style.display = "none";
        }
        
    };

    // Method to ristrict card number length.
    let ristrictCardLength = (event) => {
        let digit = String.fromCharCode(event.which);

        let value = (event.target.value + digit).replace(/\D/g, '');
        let card = getCardFromNumber(value);
        
        let maxLength = (card && card.length) || 16;

        if(value.length > maxLength) {
            event.preventDefault();
            event.stopImmediatePropagation();
            return;
        }

        if(value.length == maxLength) {
            disableCvvAndExpiry(false);
            cardExpiry.focus();
        } else {
            disableCvvAndExpiry(true);
        }
        setImage(card);
    };

    // Method to toggle CVV and Expiry.
    let disableCvvAndExpiry = (disable = true) => {
        cardCVV.disabled = disable;
        cardExpiry.disabled = disable;
    }

    // Method to ristrict CVV length.
    let ristrictCVVLength = (event) => {
        let digit  = String.fromCharCode(event.which);
        
        let value = event.target.value + digit;

        var cardNumber = cardInput.value;

        var card = getCardFromNumber(cardNumber);

        if (value.length > ((card && card.cvcLength) || 4))
        {
            event.preventDefault();
        }
    }

    // Method to ristrict expiry.
    let ristrictExpiryLength = (event) => {
        let digit = String.fromCharCode(event.which);
        let value = (event.target.value + digit).replace(/\D/g, '');

        if(value.length > 4) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }

        if(value.length == 4) {
            cardCVV.focus();
        }
    }

    // Method to format card number.
    let formatCardNumber = (event) => {
        var digit = String.fromCharCode(event.which);

        let value = (event.target.value + digit).replace(/\D/g, '');

        let formated = value.match(/.{1,4}/g).join("-");

        setTimeout(_ => event.target.value = formated, 0);

    }

    // Method to format expiry.
    let formatExpiry = (event) => {
        var digit = String.fromCharCode(event.which);

        let value = (event.target.value + digit).replace(/\D/g, '');

        let formated = value.match(/.{1,2}/g).join("/");

        setTimeout(_ => event.target.value = formated, 0);
    }

    // Method to Card HTML.
    let getCardHTML = (cardNumber, cvv, expiry, imageSrc, index) => {
        return `
        <div class="container">
        <p class="cross" data-index-number="${ index }">&#10006;</p>
        <div class="form row">
          <div class="col-10">
            <label for="CardNumber" class="text black padding-bottom-1"
              >Card Number</label
            >
            <input
              type="text"
              class="input border-round card-number"
              value="${ cardNumber }"
              readonly="readonly"
            />
          </div>
          <div class="col-2 center">
            <img id="CardImage" src="${ imageSrc }" class="card-image" />
          </div>
        </div>
        <div class="form row">
          <div class="col-6">
            <label for="CardExpiry" class="text black padding-bottom-1"
              >Expiration</label
            >
            <input
              type="text"
              class="input border-round w-90"
              value="${ expiry }"
              readonly="readonly"
            />
          </div>
          <div class="col-6">
            <label for="CardCVV" class="text black padding-bottom-1">CVV</label>
            <input
              type="text"
              class="input border-round w-90"
              value="${ cvv }"
              readonly="readonly"
            />
          </div>
        </div>
      </div>
        `
    }
    
    // Render saved cards.
    let renderSavedCards = () => {
        SavedCards.innerHTML = "";
        const cards = JSON.parse(localStorage.savedCards);
        for (const [index, card] of cards.entries()) {
            SavedCards.innerHTML += getCardHTML(card.number, card.cvv, card.expiry, card.img, index);
        }
    }

    // Method to save Card.
    let saveCard = () => {
        let number = cardInput.value;
        let img = cardDisplay.src;
        let expiry = cardExpiry.value;
        let cvv = cardCVV.value;
        if (localStorage.savedCards) {
            var prevSavedCards = JSON.parse(localStorage.savedCards);
            prevSavedCards.push(
                {
                    "number": number,
                    "img": img,
                    "expiry": expiry,
                    "cvv": cvv
                }
            );
            localStorage.savedCards = JSON.stringify(prevSavedCards);
        } else {
            localStorage.savedCards = JSON.stringify([{
                "number": number,
                "img": img,
                "expiry": expiry,
                "cvv": cvv
            }]);
        }
        cardForm.reset();
        cardDisplay.style.display = "none";
        renderSavedCards();
    }

    // Method for removing saved card.
    let removeCard = (event) => {
        if (!event.target.classList.contains('cross')) {
            return false;
        }
        let index = event.target.dataset.indexNumber;
        let cards = JSON.parse(localStorage.savedCards);
        cards.splice(index, 1);
        localStorage.savedCards = JSON.stringify(cards);
        renderSavedCards();
    }

    // Initial render for saved card.
    renderSavedCards();

    // Register listner for card input.
    cardInput.addEventListener("keypress", ristrictToNumber);
    cardInput.addEventListener("keypress", ristrictCardLength);
    cardInput.addEventListener("keypress", formatCardNumber);

    cardCVV.addEventListener("keypress", ristrictToNumber);
    cardCVV.addEventListener("keypress", ristrictCVVLength);

    cardExpiry.addEventListener("keypress", ristrictToNumber);
    cardExpiry.addEventListener("keypress", ristrictExpiryLength);
    cardExpiry.addEventListener("keypress", formatExpiry);

    saveForLater.addEventListener("click", saveCard);
    SavedCards.addEventListener("click", removeCard);

  };