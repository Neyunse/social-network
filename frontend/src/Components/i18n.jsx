import React from "react";
import { useTranslation } from "react-i18next";
/* eslint-disable */
function I18nTL(props) {
  const { t } = useTranslation("common");
  //console.log(props)
  return <>{t(props.id + "." + props.var)}</>;
}
export default I18nTL;
