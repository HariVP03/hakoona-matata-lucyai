import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleAuth } from 'google-auth-library';
import { calendar_v3, google } from 'googleapis';

export const spreadsheetId = '1xssscI1H61KqHj0GQUPgrJtMYouvyWfSIf2pBfT4uVI';

export interface GoogleEventTimePayload {
  dateTime: '2015-05-28T09:00:00-07:00';
  timeZone: 'America/Los_Angeles';
}

interface GoogleEventPayload {
  summary?: string;
  location?: string;
  description?: string;
  start?: GoogleEventTimePayload;
  end?: GoogleEventTimePayload;
  recurrence?: string[];
  attendees?: { email: string }[];
  reminders?: {
    useDefault: boolean;
    overrides: { method: string; minutes: number }[];
  };
}

type Data = {
  data?: any;
  err?: any;
};

type bodyType = {
  summary: string;
  location: string;
  description: string;
  start: GoogleEventTimePayload;
  end: GoogleEventTimePayload;
};

@Injectable()
export class GapiService {
  private readonly credentials: any;
  private readonly auth: any;
  private readonly calender: calendar_v3.Calendar;
  constructor(private configService: ConfigService) {
    this.credentials = this.configService.get<string>('GOOGLE_CREDENTIALS');
    this.auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/calendar'],
      credentials: this.credentials,
    });
    this.calender = google.calendar({ version: 'v3', auth: this.auth });
  }

  async addEvent({
    summary,
    location,
    description,
    start,
    end,
  }: bodyType): Promise<Data> {
    try {
      const payload: any = {
        summary,
        location,
        description,
        start,
        end,
        recurrence: [],
        attendees: [],
        reminders: {
          useDefault: false,
          overrides: [],
        },
      };

      const res = this.calender.events.insert(
        {
          // Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
          calendarId: 'placeholder-value',
          // Version number of conference data supported by the API client. Version 0 assumes no conference data support and ignores conference data in the event's body. Version 1 enables support for copying of ConferenceData as well as for creating new conferences using the createRequest field of conferenceData. The default is 0.
          conferenceDataVersion: 'placeholder-value',
          // The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional.
          maxAttendees: 'placeholder-value',
          // Deprecated. Please use sendUpdates instead.
          //
          // Whether to send notifications about the creation of the new event. Note that some emails might still be sent even if you set the value to false. The default is false.
          sendNotifications: 'placeholder-value',
          // Whether to send notifications about the creation of the new event. Note that some emails might still be sent. The default is false.
          sendUpdates: 'placeholder-value',
          // Whether API client performing operation supports event attachments. Optional. The default is False.
          supportsAttachments: 'placeholder-value',
          // Request body metadata
          requestBody: {
            //   "anyoneCanAddSelf": false,
            //   "attachments": [],
            //   "attendees": [],
            //   "attendeesOmitted": false,
            //   "colorId": "my_colorId",
            //   "conferenceData": {},
            //   "created": "my_created",
            //   "creator": {},
            //   "description": "my_description",
            //   "end": {},
            //   "endTimeUnspecified": false,
            //   "etag": "my_etag",
            //   "eventType": "my_eventType",
            //   "extendedProperties": {},
            //   "gadget": {},
            //   "guestsCanInviteOthers": false,
            //   "guestsCanModify": false,
            //   "guestsCanSeeOtherGuests": false,
            //   "hangoutLink": "my_hangoutLink",
            //   "htmlLink": "my_htmlLink",
            //   "iCalUID": "my_iCalUID",
            //   "id": "my_id",
            //   "kind": "my_kind",
            //   "location": "my_location",
            //   "locked": false,
            //   "organizer": {},
            //   "originalStartTime": {},
            //   "privateCopy": false,
            //   "recurrence": [],
            //   "recurringEventId": "my_recurringEventId",
            //   "reminders": {},
            //   "sequence": 0,
            //   "source": {},
            //   "start": {},
            //   "status": "my_status",
            //   "summary": "my_summary",
            //   "transparency": "my_transparency",
            //   "updated": "my_updated",
            //   "visibility": "my_visibility",
            //   "workingLocationProperties": {}
          },
        } as any,
        function (err, event) {
          console.log('Event created: %s', event.htmlLink);
        },
      );
      const x = {
        auth: this.auth,
        calendarId: 'primary',
        resource: payload,
      };

      return { data: res };
    } catch (err) {
      return { err };
    }
  }
}
