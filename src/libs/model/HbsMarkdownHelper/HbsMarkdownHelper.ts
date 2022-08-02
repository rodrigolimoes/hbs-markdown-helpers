export interface CustomLabelBoolean {
  true: string;
  false: string;
}

export interface CustomFormatDate {
  customFormatDate?: string;
}

export interface HbsMarkdownHelpersConfig extends CustomFormatDate {
  customLabelBoolean?: CustomLabelBoolean;
}
