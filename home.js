const axios = require('axios');
const qs = require('qs');

const apiUrl = "https://slack.com/api/";

const displayHome = async (user, step) => {
  let body = {
    token: process.env.SLACK_ACCESS_TOKEN,
    user_id: user,
    view: await updateHomeView(step)
  }

  let result = await axios.post(`${apiUrl}/views.publish`, qs.stringify(body))

  if (result.data.error) {
    console.log(result.data.error)
  }
}


const updateHomeView = (step) => {
  let blocks;

  if (step === 1) {
    blocks = [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: '*Welcome!* \nThis is the home page for the slack-ui app. :blush:'
        }
      }, 
      {
        type: "input",
        block_id: "first_name",
        label: {
          type: "plain_text",
          text: "First name"
        },
        element: {
          type: "plain_text_input",
          action_id: "plain_input",
          placeholder: {
            type: "plain_text",
            text: "first name"
          }
        }
      },
      {
        type: "input",
        block_id: "last_name",
        label: {
          type: "plain_text",
          text: "Last name"
        },
        element: {
          type: "plain_text_input",
          action_id: "plain_input",
          placeholder: {
            type: "plain_text",
            text: "last name"
          }
        }
      },
      {
        type: "actions",
        block_id: "name",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Next",
            },
            value: "next",

          }
        ]
      }
      // {
      //   type: "actions",
      //   block_id: '123',
      //   elements: [
      //     {
      //       type: "static_select",
      //       placeholder: {
      //         type: "plain_text",
      //         text: "select an item"
      //       },
      //       options: [
      //         {
      //           text: {
      //             type: "plain_text",
      //             text: "hello"
      //           }
      //         }
      //       ]
      //     }
      //   ]
      // }
      
    ]
  }

  else if (step === 2) {
    blocks = [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: '*We will match you with the your peers based on your interests. Select your interests below :blush:*'
        }
      }, 
      {
        type: "input",
        block_id: "professional_interest",
        label: {
          type: "plain_text",
          text: "Select a professional interest"
        },
        element: {
          type: "static_select",
          placeholder: {
            type: "plain_text",
            text: "Select an interest"
          },
          options: [
            {
              text: {
                type: "plain_text",
                text: "TV"
              },
              value: "tv"
            },
            {
              text: {
                type: "plain_text",
                text: "Gaming"
              },
              value: "gaming"
            },
            {
              text: {
                type: "plain_text",
                text: "Sports"
              },
              value: "sports"
            },
            {
              text: {
                type: "plain_text",
                text: "Music"
              },
              value: "music"
            },
            {
              text: {
                type: "plain_text",
                text: "Reading"
              },
              value: "reading"
            }
          ]
        }
      },
      {
        type: "input",
        block_id: "social_interest",
        label: {
          type: "plain_text",
          text: "Select a social interest"
        },
        element: {
          type: "static_select",
          placeholder: {
            type: "plain_text",
            text: "Select an interest"
          },
          options: [
            {
              text: {
                type: "plain_text",
                text: "Family"
              },
              value: "family"
            },
            {
              text: {
                type: "plain_text",
                text: "Travel"
              },
              value: "travel"
            },
            {
              text: {
                type: "plain_text",
                text: "Politics"
              },
              value: "politics"
            },
            {
              text: {
                type: "plain_text",
                text: "Pets"
              },
              value: "pets"
            },
            {
              text: {
                type: "plain_text",
                text: "World"
              },
              value: "world"
            }
          ]
        }
      },
      {
        type: "actions",
        block_id: "interest",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Next",
            },
            value: "next",

          }
        ]
      }
    ]
  }

  else if (step === 3) {
    blocks = [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: '*We will match you to your peers according to your preferences. Select your preferences below :blush:*'
        }
      }, 
      {
        type: "input",
        block_id: "willingness",
        label: {
          type: "plain_text",
          text: "Do you mind if we match you to someone that doesn't have similar interest?"
        },
        element: {
          type: "radio_buttons",
          initial_option: {
            value: "yes",
            text: {
              type: "plain_text",
              text: "Yes"
            }
          },
          options: [
            {
              text: {
                type: "plain_text",
                text: "Yes"
              },
              value: "yes"
            },
            {
              text: {
                type: "plain_text",
                text: "No"
              },
              value: "no"
            }
          ]
        }
      },
      {
        type: "input",
        block_id: "group",
        label: {
          type: "plain_text",
          text: "Do you prefer the meetings to be in a group setting?"
        },
        element: {
          type: "radio_buttons",
          initial_option: {
            value: "yes",
            text: {
              type: "plain_text",
              text: "Yes"
            }
          },
          options: [
            {
              text: {
                type: "plain_text",
                text: "Yes"
              },
              value: "yes"
            },
            {
              text: {
                type: "plain_text",
                text: "Neutral"
              },
              value: "neutral"
            },
            {
              text: {
                type: "plain_text",
                text: "No"
              },
              value: "no"
            }
          ]
        }
      },
      {
        type: "input",
        block_id: "days",
        label: {
          type: "plain_text",
          text: "Do you prefer the meetings to be in a group setting?"
        },
        element: {
          type: "checkboxes",
          initial_options: [{
            value: "monday",
            text: {
              type: "plain_text",
              text: "Monday"
            }
          }],
          options: [
            {
              text: {
                type: "plain_text",
                text: "Monday"
              },
              value: "monday"
            },
            {
              text: {
                type: "plain_text",
                text: "Tuesday"
              },
              value: "tuesday"
            },
            {
              text: {
                type: "plain_text",
                text: "Wednesday"
              },
              value: "wednesday"
            },
            {
              text: {
                type: "plain_text",
                text: "Thursday"
              },
              value: "thursday"
            },
            {
              text: {
                type: "plain_text",
                text: "Friday"
              },
              value: "friday"
            }
          ]
        }
      },
      {
        type: "actions",
        block_id: "preference",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Next",
            },
            value: "next",

          }
        ]
      }
    ]
  }

  else if (step === 4) {
    blocks = [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: '*For the first meeting, choose a time and date that you prefer to have the meeting :blush:*'
        }
      }, 
      {
        type: "input",
        label: {
          type: "plain_text",
          text: "Select a date"
        },
        element: {
          type: "datepicker",
          action_id: "datepicker1",
          initial_date: "2020-01-01",
          placeholder: {
            type: "plain_text",
            text: "Select a date"
          }
        }
      },
      {
        type: "input",
        label: {
          type: "plain_text",
          text: "Select a time"
        },
        element: {
          type: "timepicker",
          action_id: "timepicker1",
          initial_time: "00:00",
          placeholder: {
            type: "plain_text",
            text: "Select a time"
          }
        }
      },
      {
        type: "actions",
        block_id: "datetime",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Next",
            },
            value: "next",

          }
        ]
      }
    ]
  }

  else {
    blocks = [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: '* We have gotten your info successfully! Sit back and relax while we do the matching for you :wink:*'
        }
      }, 
      {
        type: "image",
        image_url: "http://placekitten.com/700/500",
        alt_text: "confirmation image"

      },
    ]
  }



  
  // The final view -
  
  let view = {
    type: 'home',
    title: {
      type: 'plain_text',
      text: 'Keep notes!'
    },
    blocks: blocks
  }
  
  return JSON.stringify(view);
}

module.exports = { displayHome };