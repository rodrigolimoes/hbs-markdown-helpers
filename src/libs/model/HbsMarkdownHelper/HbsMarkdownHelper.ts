export interface CustomLabelBoolean {
  true: string;
  false: string;
}

export interface HbsMarkdownHelpersConfig {
  configTable?: {
    customLabelBoolean?: CustomLabelBoolean;
    customFormatDate?: string;
  };
}
