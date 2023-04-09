export type Command = {
  command: string;
  description: string;
};

export interface messageRecieveImage {
  event_type: 'message_received';
  instanceId: '1150';
  data: {
    id: 'false_17692426345@c.us_3EB0FF54790702367270';
    from: string;
    to: string;
    ack: '';
    type: 'chat';
    body: string;
    fromMe: false;
    time: 1644957719;
  };
}
