import { CustomLabelBoolean } from "../model/HbsMarkdownHelper/HbsMarkdownHelper";

interface FormatBooleanValue {
  value: boolean;
  customLabelBoolean: CustomLabelBoolean;
}

export const formatBooleanValue = ({
  value,
  customLabelBoolean,
}: FormatBooleanValue) => {
  return customLabelBoolean[value as unknown as keyof CustomLabelBoolean];
};
