// Not used
export const IFRAME_CMD_NONE = "none";
export const IFRAME_CMD_LOGOUT = "logout";
// Message sent when Onevasc is ready to receive/send messages
export const IFRAME_CMD_READY = "onevReady";
// Message sent when an error is encountered. Usually, the original message is available under the data field,
// while the error field should contain information about the error
export const IFRAME_CMD_ERROR = "onevError";
// Message sent when not logged in. When this message is emmited, a IFRAME_CMD_LOGIN_WITH_CREDENTIALS message is expected
export const IFRAME_CMD_LOGIN_REQUEST = "onevLoginRequest";
// Any IFRAME_CMD_LOGIN_WITH_CREDENTIALS message should be followed by this message indicating any login error or success
export const IFRAME_CMD_LOGIN_RESPONSE = "onevLoginResponse";
// Used to send the credentials for login. This message is expected to havas the following data attached :
// data: { username: "emailAddress",
// password: "passwordValue" }
export const IFRAME_CMD_LOGIN_WITH_CREDENTIALS = "onevLoginWithCredentials";
// When this message is received, the same message is sent back containing all data required to be saved in the data field
export const IFRAME_CMD_SAVE_ONEV = "saveOnev";
// Use this message to load data previously saved data.
export const IFRAME_CMD_NEW_EXAM = "newExam";

export const IFRAME_CMD_LOAD_ONEV = "loadOnev";
// When one of these messages is received, the same message is sent back, with data containing various file formats encoded in base64
// in order to get the result, due to browser security, it is mandatory to focus the iframe when these messages are sent
export const IFRAME_CMD_SAVE_PDF = "savePdf";
export const IFRAME_CMD_SAVE_PNG = "savePng";
export const IFRAME_CMD_SAVE_JPEG = "saveJpeg";
// Use this message to set a stent listing used to map your data. The same message is sent back indicating if success or error occurred
export const IFRAME_CMD_SET_STENTS = "setStents";
// Use this message to send multiple messages. The data field is expected to be an array of iframe_message objects
export const IFRAME_CMD_MESSAGE_ARRAY = "messageArray";
// When this message is received, the same message is sent back containing a listing of all injuries data & texts informations
export const IFRAME_CMD_GET_INJURIES = "getInjuries";
// When this message is received, the same message is sent back containing a listing of all injuries data & texts informations
export const IFRAME_CMD_CREATE_OBJECT = "createObject";

export type CommandType = typeof IFRAME_CMD_NONE | typeof IFRAME_CMD_NEW_EXAM | typeof IFRAME_CMD_LOGOUT | typeof IFRAME_CMD_READY | typeof IFRAME_CMD_ERROR |
typeof IFRAME_CMD_LOGIN_REQUEST | typeof IFRAME_CMD_LOGIN_WITH_CREDENTIALS | typeof IFRAME_CMD_LOGIN_RESPONSE |
typeof IFRAME_CMD_LOAD_ONEV | typeof IFRAME_CMD_SAVE_ONEV |
typeof IFRAME_CMD_SAVE_PDF | typeof IFRAME_CMD_SAVE_PNG | typeof IFRAME_CMD_SAVE_JPEG | typeof IFRAME_CMD_SET_STENTS |
typeof IFRAME_CMD_MESSAGE_ARRAY | typeof IFRAME_CMD_GET_INJURIES | typeof IFRAME_CMD_CREATE_OBJECT;

export type Callback = (obj: any) => void;

export class iframe_message {
    onevasc: boolean = true;
    command: CommandType = IFRAME_CMD_NONE;
    data?: any = null;
    error?: any = null;

    constructor(cmd: CommandType, data?: any, error?: any) {
        this.command = cmd;
        this.data = data;
        this.error = error;
    }
}

export class stentDefinition {
    name: string = "";
    diameter?: number;
    length?: number;

    constructor(name: string, diameter?: number, length?: number) {
        this.name = name;
        this.diameter = diameter;
        this.length = length;
    }
}

