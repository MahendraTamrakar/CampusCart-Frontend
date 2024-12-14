declare module 'formidable' {
    import { EventEmitter } from 'events';
  
    interface File {
      filepath: string;
      originalFilename?: string | null;
      mimetype?: string | null;
      newFilename: string;
      size: number;
    }
  
    interface Fields {
      [key: string]: string | string[];
    }
  
    interface Files {
      [key: string]: File | File[];
    }
  
    interface IncomingFormOptions {
      uploadDir?: string;
      keepExtensions?: boolean;
    }
  
    class IncomingForm extends EventEmitter {
      static IncomingForm: any;
      constructor(options?: IncomingFormOptions);
      parse(
        req: any,
        callback: (err: Error | null, fields: Fields, files: Files) => void
      ): void;
    }
  
    export { File, Fields, Files, IncomingFormOptions, IncomingForm };
    export default IncomingForm;
  }
  