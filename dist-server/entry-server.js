var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b;
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React4, { Component, useState, useRef, useEffect, useMemo, lazy, Suspense } from "react";
import ReactDOMServer from "react-dom/server";
import { useNavigate, useLocation, Routes, Route, StaticRouter } from "react-router-dom";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import { createPortal } from "react-dom";
import { Search, X, MapPin, ChevronDown, Home as Home$1, Users, Clock, Zap, CalendarClock, HeartPulse, HandHeart, CreditCard, Phone, DollarSign, Sparkles, Car, UserCheck, ClipboardList, Baby, ChefHat, Coffee, Utensils, PawPrint, Layers, Briefcase, Check, CheckCircle2, Ban, CircleCheck, Gift, Target, Filter, ContactRound, Gauge, RotateCcw, Handshake, Headphones, IdCard, ArrowLeft, Loader2, Minus, Plus, Shield, Star, CalendarCheck, CircleX, TriangleAlert, MessageSquare } from "lucide-react";
import axios from "axios";
var TAG_NAMES = /* @__PURE__ */ ((TAG_NAMES2) => {
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["FRAGMENT"] = "Symbol(react.fragment)";
  return TAG_NAMES2;
})(TAG_NAMES || {});
var SEO_PRIORITY_TAGS = {
  link: { rel: ["amphtml", "canonical", "alternate"] },
  script: { type: ["application/ld+json"] },
  meta: {
    charset: "",
    name: ["generator", "robots", "description"],
    property: [
      "og:type",
      "og:title",
      "og:url",
      "og:image",
      "og:image:alt",
      "og:description",
      "twitter:url",
      "twitter:title",
      "twitter:description",
      "twitter:image",
      "twitter:image:alt",
      "twitter:card",
      "twitter:site"
    ]
  }
};
var VALID_TAG_NAMES = Object.values(TAG_NAMES);
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HTML_TAG_MAP = Object.entries(REACT_TAG_MAP).reduce(
  (carry, [key, value]) => {
    carry[value] = key;
    return carry;
  },
  {}
);
var HELMET_ATTRIBUTE = "data-rh";
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate",
  PRIORITIZE_SEO_TAGS: "prioritizeSeoTags"
};
var getInnermostProperty = (propsList, property) => {
  for (let i = propsList.length - 1; i >= 0; i -= 1) {
    const props = propsList[i];
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      return props[property];
    }
  }
  return null;
};
var getTitleFromPropsList = (propsList) => {
  let innermostTitle = getInnermostProperty(
    propsList,
    "title"
    /* TITLE */
  );
  const innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
  if (Array.isArray(innermostTitle)) {
    innermostTitle = innermostTitle.join("");
  }
  if (innermostTemplate && innermostTitle) {
    return innermostTemplate.replace(/%s/g, () => innermostTitle);
  }
  const innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = (propsList) => getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || (() => {
});
var getAttributesFromPropsList = (tagType, propsList) => propsList.filter((props) => typeof props[tagType] !== "undefined").map((props) => props[tagType]).reduce((tagAttrs, current) => ({ ...tagAttrs, ...current }), {});
var getBaseTagFromPropsList = (primaryAttributes, propsList) => propsList.filter((props) => typeof props[
  "base"
  /* BASE */
] !== "undefined").map((props) => props[
  "base"
  /* BASE */
]).reverse().reduce((innermostBaseTag, tag) => {
  if (!innermostBaseTag.length) {
    const keys = Object.keys(tag);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const lowerCaseAttributeKey = attributeKey.toLowerCase();
      if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
        return innermostBaseTag.concat(tag);
      }
    }
  }
  return innermostBaseTag;
}, []);
var warn = (msg) => console && typeof console.warn === "function" && console.warn(msg);
var getTagsFromPropsList = (tagName, primaryAttributes, propsList) => {
  const approvedSeenTags = {};
  return propsList.filter((props) => {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn(
        `Helmet: ${tagName} should be of type "Array". Instead found type "${typeof props[tagName]}"`
      );
    }
    return false;
  }).map((props) => props[tagName]).reverse().reduce((approvedTags, instanceTags) => {
    const instanceSeenTags = {};
    instanceTags.filter((tag) => {
      let primaryAttributeKey;
      const keys2 = Object.keys(tag);
      for (let i = 0; i < keys2.length; i += 1) {
        const attributeKey = keys2[i];
        const lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === "rel" && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === "rel" && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === "innerHTML" || attributeKey === "cssText" || attributeKey === "itemprop")) {
          primaryAttributeKey = attributeKey;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      const value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach((tag) => approvedTags.push(tag));
    const keys = Object.keys(instanceSeenTags);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const tagUnion = {
        ...approvedSeenTags[attributeKey],
        ...instanceSeenTags[attributeKey]
      };
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getAnyTrueFromPropsList = (propsList, checkedTag) => {
  if (Array.isArray(propsList) && propsList.length) {
    for (let index = 0; index < propsList.length; index += 1) {
      const prop = propsList[index];
      if (prop[checkedTag]) {
        return true;
      }
    }
  }
  return false;
};
var reducePropsToState = (propsList) => ({
  baseTag: getBaseTagFromPropsList([
    "href"
    /* HREF */
  ], propsList),
  bodyAttributes: getAttributesFromPropsList("bodyAttributes", propsList),
  defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
  encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
  htmlAttributes: getAttributesFromPropsList("htmlAttributes", propsList),
  linkTags: getTagsFromPropsList(
    "link",
    [
      "rel",
      "href"
      /* HREF */
    ],
    propsList
  ),
  metaTags: getTagsFromPropsList(
    "meta",
    [
      "name",
      "charset",
      "http-equiv",
      "property",
      "itemprop"
      /* ITEM_PROP */
    ],
    propsList
  ),
  noscriptTags: getTagsFromPropsList("noscript", [
    "innerHTML"
    /* INNER_HTML */
  ], propsList),
  onChangeClientState: getOnChangeClientState(propsList),
  scriptTags: getTagsFromPropsList(
    "script",
    [
      "src",
      "innerHTML"
      /* INNER_HTML */
    ],
    propsList
  ),
  styleTags: getTagsFromPropsList("style", [
    "cssText"
    /* CSS_TEXT */
  ], propsList),
  title: getTitleFromPropsList(propsList),
  titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
  prioritizeSeoTags: getAnyTrueFromPropsList(propsList, HELMET_PROPS.PRIORITIZE_SEO_TAGS)
});
var flattenArray = (possibleArray) => Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
var checkIfPropsMatch = (props, toMatch) => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i += 1) {
    if (toMatch[keys[i]] && toMatch[keys[i]].includes(props[keys[i]])) {
      return true;
    }
  }
  return false;
};
var prioritizer = (elementsList, propsToMatch) => {
  if (Array.isArray(elementsList)) {
    return elementsList.reduce(
      (acc, elementAttrs) => {
        if (checkIfPropsMatch(elementAttrs, propsToMatch)) {
          acc.priority.push(elementAttrs);
        } else {
          acc.default.push(elementAttrs);
        }
        return acc;
      },
      { priority: [], default: [] }
    );
  }
  return { default: elementsList, priority: [] };
};
var without = (obj, key) => {
  return {
    ...obj,
    [key]: void 0
  };
};
var SELF_CLOSING_TAGS = [
  "noscript",
  "script",
  "style"
  /* STYLE */
];
var encodeSpecialCharacters = (str, encode = true) => {
  if (encode === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var generateElementAttributesAsString = (attributes) => Object.keys(attributes).reduce((str, key) => {
  const attr = typeof attributes[key] !== "undefined" ? `${key}="${attributes[key]}"` : `${key}`;
  return str ? `${str} ${attr}` : attr;
}, "");
var generateTitleAsString = (type, title, attributes, encode) => {
  const attributeString = generateElementAttributesAsString(attributes);
  const flattenedTitle = flattenArray(title);
  return attributeString ? `<${type} ${HELMET_ATTRIBUTE}="true" ${attributeString}>${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>` : `<${type} ${HELMET_ATTRIBUTE}="true">${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>`;
};
var generateTagsAsString = (type, tags, encode = true) => tags.reduce((str, t) => {
  const tag = t;
  const attributeHtml = Object.keys(tag).filter(
    (attribute) => !(attribute === "innerHTML" || attribute === "cssText")
  ).reduce((string, attribute) => {
    const attr = typeof tag[attribute] === "undefined" ? attribute : `${attribute}="${encodeSpecialCharacters(tag[attribute], encode)}"`;
    return string ? `${string} ${attr}` : attr;
  }, "");
  const tagContent = tag.innerHTML || tag.cssText || "";
  const isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
  return `${str}<${type} ${HELMET_ATTRIBUTE}="true" ${attributeHtml}${isSelfClosing ? `/>` : `>${tagContent}</${type}>`}`;
}, "");
var convertElementAttributesToReactProps = (attributes, initProps = {}) => Object.keys(attributes).reduce((obj, key) => {
  const mapped = REACT_TAG_MAP[key];
  obj[mapped || key] = attributes[key];
  return obj;
}, initProps);
var generateTitleAsReactComponent = (_type, title, attributes) => {
  const initProps = {
    key: title,
    [HELMET_ATTRIBUTE]: true
  };
  const props = convertElementAttributesToReactProps(attributes, initProps);
  return [React4.createElement("title", props, title)];
};
var generateTagsAsReactComponent = (type, tags) => tags.map((tag, i) => {
  const mappedTag = {
    key: i,
    [HELMET_ATTRIBUTE]: true
  };
  Object.keys(tag).forEach((attribute) => {
    const mapped = REACT_TAG_MAP[attribute];
    const mappedAttribute = mapped || attribute;
    if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
      const content = tag.innerHTML || tag.cssText;
      mappedTag.dangerouslySetInnerHTML = { __html: content };
    } else {
      mappedTag[mappedAttribute] = tag[attribute];
    }
  });
  return React4.createElement(type, mappedTag);
});
var getMethodsForTag = (type, tags, encode = true) => {
  switch (type) {
    case "title":
      return {
        toComponent: () => generateTitleAsReactComponent(type, tags.title, tags.titleAttributes),
        toString: () => generateTitleAsString(type, tags.title, tags.titleAttributes, encode)
      };
    case "bodyAttributes":
    case "htmlAttributes":
      return {
        toComponent: () => convertElementAttributesToReactProps(tags),
        toString: () => generateElementAttributesAsString(tags)
      };
    default:
      return {
        toComponent: () => generateTagsAsReactComponent(type, tags),
        toString: () => generateTagsAsString(type, tags, encode)
      };
  }
};
var getPriorityMethods = ({ metaTags, linkTags, scriptTags, encode }) => {
  const meta = prioritizer(metaTags, SEO_PRIORITY_TAGS.meta);
  const link = prioritizer(linkTags, SEO_PRIORITY_TAGS.link);
  const script = prioritizer(scriptTags, SEO_PRIORITY_TAGS.script);
  const priorityMethods = {
    toComponent: () => [
      ...generateTagsAsReactComponent("meta", meta.priority),
      ...generateTagsAsReactComponent("link", link.priority),
      ...generateTagsAsReactComponent("script", script.priority)
    ],
    toString: () => (
      // generate all the tags as strings and concatenate them
      `${getMethodsForTag("meta", meta.priority, encode)} ${getMethodsForTag(
        "link",
        link.priority,
        encode
      )} ${getMethodsForTag("script", script.priority, encode)}`
    )
  };
  return {
    priorityMethods,
    metaTags: meta.default,
    linkTags: link.default,
    scriptTags: script.default
  };
};
var mapStateOnServer = (props) => {
  const {
    baseTag,
    bodyAttributes,
    encode = true,
    htmlAttributes,
    noscriptTags,
    styleTags,
    title = "",
    titleAttributes,
    prioritizeSeoTags
  } = props;
  let { linkTags, metaTags, scriptTags } = props;
  let priorityMethods = {
    toComponent: () => [],
    toString: () => ""
  };
  if (prioritizeSeoTags) {
    ({ priorityMethods, linkTags, metaTags, scriptTags } = getPriorityMethods(props));
  }
  return {
    priority: priorityMethods,
    base: getMethodsForTag("base", baseTag, encode),
    bodyAttributes: getMethodsForTag("bodyAttributes", bodyAttributes, encode),
    htmlAttributes: getMethodsForTag("htmlAttributes", htmlAttributes, encode),
    link: getMethodsForTag("link", linkTags, encode),
    meta: getMethodsForTag("meta", metaTags, encode),
    noscript: getMethodsForTag("noscript", noscriptTags, encode),
    script: getMethodsForTag("script", scriptTags, encode),
    style: getMethodsForTag("style", styleTags, encode),
    title: getMethodsForTag("title", { title, titleAttributes }, encode)
  };
};
var server_default = mapStateOnServer;
var instances = [];
var isDocument = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var HelmetData = class {
  constructor(context, canUseDOM) {
    __publicField(this, "instances", []);
    __publicField(this, "canUseDOM", isDocument);
    __publicField(this, "context");
    __publicField(this, "value", {
      setHelmet: (serverState) => {
        this.context.helmet = serverState;
      },
      helmetInstances: {
        get: () => this.canUseDOM ? instances : this.instances,
        add: (instance) => {
          (this.canUseDOM ? instances : this.instances).push(instance);
        },
        remove: (instance) => {
          const index = (this.canUseDOM ? instances : this.instances).indexOf(instance);
          (this.canUseDOM ? instances : this.instances).splice(index, 1);
        }
      }
    });
    this.context = context;
    this.canUseDOM = canUseDOM || false;
    if (!canUseDOM) {
      context.helmet = server_default({
        baseTag: [],
        bodyAttributes: {},
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
  }
};
var major = parseInt(React4.version.split(".")[0], 10);
var isReact19 = major >= 19;
var defaultValue = {};
var Context = React4.createContext(defaultValue);
var HelmetProvider = (_a = class extends Component {
  constructor(props) {
    super(props);
    __publicField(this, "helmetData");
    if (isReact19) {
      this.helmetData = null;
    } else {
      this.helmetData = new HelmetData(this.props.context || {}, _a.canUseDOM);
    }
  }
  render() {
    if (isReact19) {
      return /* @__PURE__ */ React4.createElement(React4.Fragment, null, this.props.children);
    }
    return /* @__PURE__ */ React4.createElement(Context.Provider, { value: this.helmetData.value }, this.props.children);
  }
}, __publicField(_a, "canUseDOM", isDocument), _a);
var updateTags = (type, tags) => {
  const headElement = document.head || document.querySelector(
    "head"
    /* HEAD */
  );
  const tagNodes = headElement.querySelectorAll(`${type}[${HELMET_ATTRIBUTE}]`);
  const oldTags = [].slice.call(tagNodes);
  const newTags = [];
  let indexToDelete;
  if (tags && tags.length) {
    tags.forEach((tag) => {
      const newElement = document.createElement(type);
      for (const attribute in tag) {
        if (Object.prototype.hasOwnProperty.call(tag, attribute)) {
          if (attribute === "innerHTML") {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === "cssText") {
            const cssText = tag.cssText;
            newElement.appendChild(document.createTextNode(cssText));
          } else {
            const attr = attribute;
            const value = typeof tag[attr] === "undefined" ? "" : tag[attr];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(HELMET_ATTRIBUTE, "true");
      if (oldTags.some((existingTag, index) => {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach((tag) => tag.parentNode?.removeChild(tag));
  newTags.forEach((tag) => headElement.appendChild(tag));
  return {
    oldTags,
    newTags
  };
};
var updateAttributes = (tagName, attributes) => {
  const elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  const helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  const helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  const attributesToRemove = [...helmetAttributes];
  const attributeKeys = Object.keys(attributes);
  for (const attribute of attributeKeys) {
    const value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    const indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (let i = attributesToRemove.length - 1; i >= 0; i -= 1) {
    elementTag.removeAttribute(attributesToRemove[i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTitle = (title, attributes) => {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }
  updateAttributes("title", attributes);
};
var commitTagChanges = (newState, cb) => {
  const {
    baseTag,
    bodyAttributes,
    htmlAttributes,
    linkTags,
    metaTags,
    noscriptTags,
    onChangeClientState,
    scriptTags,
    styleTags,
    title,
    titleAttributes
  } = newState;
  updateAttributes("body", bodyAttributes);
  updateAttributes("html", htmlAttributes);
  updateTitle(title, titleAttributes);
  const tagUpdates = {
    baseTag: updateTags("base", baseTag),
    linkTags: updateTags("link", linkTags),
    metaTags: updateTags("meta", metaTags),
    noscriptTags: updateTags("noscript", noscriptTags),
    scriptTags: updateTags("script", scriptTags),
    styleTags: updateTags("style", styleTags)
  };
  const addedTags = {};
  const removedTags = {};
  Object.keys(tagUpdates).forEach((tagType) => {
    const { newTags, oldTags } = tagUpdates[tagType];
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  if (cb) {
    cb();
  }
  onChangeClientState(newState, addedTags, removedTags);
};
var _helmetCallback = null;
var handleStateChangeOnClient = (newState) => {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(() => {
      commitTagChanges(newState, () => {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var client_default = handleStateChangeOnClient;
var HelmetDispatcher = class extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "rendered", false);
  }
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props);
  }
  componentDidUpdate() {
    this.emitChange();
  }
  componentWillUnmount() {
    const { helmetInstances } = this.props.context;
    helmetInstances.remove(this);
    this.emitChange();
  }
  emitChange() {
    const { helmetInstances, setHelmet } = this.props.context;
    let serverState = null;
    const state = reducePropsToState(
      helmetInstances.get().map((instance) => {
        const { context: _context, ...props } = instance.props;
        return props;
      })
    );
    if (HelmetProvider.canUseDOM) {
      client_default(state);
    } else if (server_default) {
      serverState = server_default(state);
    }
    setHelmet(serverState);
  }
  // componentWillMount will be deprecated
  // for SSR, initialize on first render
  // constructor is also unsafe in StrictMode
  init() {
    if (this.rendered) {
      return;
    }
    this.rendered = true;
    const { helmetInstances } = this.props.context;
    helmetInstances.add(this);
    this.emitChange();
  }
  render() {
    this.init();
    return null;
  }
};
var react19Instances = [];
var toHtmlAttributes = (props) => {
  const result = {};
  for (const key of Object.keys(props)) {
    result[HTML_TAG_MAP[key] || key] = props[key];
  }
  return result;
};
var toReactProps = (attrs) => {
  const result = {};
  for (const key of Object.keys(attrs)) {
    const mapped = REACT_TAG_MAP[key];
    result[mapped || key] = attrs[key];
  }
  return result;
};
var applyAttributes = (tagName, attributes) => {
  if (!isDocument)
    return;
  const el = document.getElementsByTagName(tagName)[0];
  if (!el)
    return;
  const managedAttr = "data-rh-managed";
  const prev = el.getAttribute(managedAttr);
  const prevKeys = prev ? prev.split(",") : [];
  const nextKeys = Object.keys(attributes);
  for (const key of prevKeys) {
    if (!nextKeys.includes(key)) {
      el.removeAttribute(key);
    }
  }
  for (const key of nextKeys) {
    const value = attributes[key];
    if (value === void 0 || value === null || value === false) {
      el.removeAttribute(key);
    } else if (value === true) {
      el.setAttribute(key, "");
    } else {
      el.setAttribute(key, String(value));
    }
  }
  if (nextKeys.length > 0) {
    el.setAttribute(managedAttr, nextKeys.join(","));
  } else {
    el.removeAttribute(managedAttr);
  }
};
var syncAllAttributes = () => {
  const htmlAttrs = {};
  const bodyAttrs = {};
  for (const instance of react19Instances) {
    const { htmlAttributes, bodyAttributes } = instance.props;
    if (htmlAttributes) {
      Object.assign(htmlAttrs, toHtmlAttributes(htmlAttributes));
    }
    if (bodyAttributes) {
      Object.assign(bodyAttrs, toHtmlAttributes(bodyAttributes));
    }
  }
  applyAttributes("html", htmlAttrs);
  applyAttributes("body", bodyAttrs);
};
var React19Dispatcher = class extends Component {
  componentDidMount() {
    react19Instances.push(this);
    syncAllAttributes();
  }
  componentDidUpdate() {
    syncAllAttributes();
  }
  componentWillUnmount() {
    const index = react19Instances.indexOf(this);
    if (index !== -1) {
      react19Instances.splice(index, 1);
    }
    syncAllAttributes();
  }
  resolveTitle() {
    const { title, titleTemplate, defaultTitle } = this.props;
    if (title && titleTemplate) {
      return titleTemplate.replace(/%s/g, () => Array.isArray(title) ? title.join("") : title);
    }
    return title || defaultTitle || void 0;
  }
  renderTitle() {
    const title = this.resolveTitle();
    if (title === void 0)
      return null;
    const titleAttributes = this.props.titleAttributes || {};
    return React4.createElement("title", toReactProps(titleAttributes), title);
  }
  renderBase() {
    const { base } = this.props;
    if (!base)
      return null;
    return React4.createElement("base", toReactProps(base));
  }
  renderMeta() {
    const { meta } = this.props;
    if (!meta || !Array.isArray(meta))
      return null;
    return meta.map(
      (attrs, i) => React4.createElement("meta", {
        key: i,
        ...toReactProps(attrs)
      })
    );
  }
  renderLink() {
    const { link } = this.props;
    if (!link || !Array.isArray(link))
      return null;
    return link.map(
      (attrs, i) => React4.createElement("link", {
        key: i,
        ...toReactProps(attrs)
      })
    );
  }
  renderScript() {
    const { script } = this.props;
    if (!script || !Array.isArray(script))
      return null;
    return script.map((attrs, i) => {
      const { innerHTML, ...rest } = attrs;
      const props = toReactProps(rest);
      if (innerHTML) {
        props.dangerouslySetInnerHTML = { __html: innerHTML };
      }
      return React4.createElement("script", { key: i, ...props });
    });
  }
  renderStyle() {
    const { style } = this.props;
    if (!style || !Array.isArray(style))
      return null;
    return style.map((attrs, i) => {
      const { cssText, ...rest } = attrs;
      const props = toReactProps(rest);
      if (cssText) {
        props.dangerouslySetInnerHTML = { __html: cssText };
      }
      return React4.createElement("style", { key: i, ...props });
    });
  }
  renderNoscript() {
    const { noscript } = this.props;
    if (!noscript || !Array.isArray(noscript))
      return null;
    return noscript.map((attrs, i) => {
      const { innerHTML, ...rest } = attrs;
      const props = toReactProps(rest);
      if (innerHTML) {
        props.dangerouslySetInnerHTML = { __html: innerHTML };
      }
      return React4.createElement("noscript", { key: i, ...props });
    });
  }
  render() {
    return React4.createElement(
      React4.Fragment,
      null,
      this.renderTitle(),
      this.renderBase(),
      this.renderMeta(),
      this.renderLink(),
      this.renderScript(),
      this.renderStyle(),
      this.renderNoscript()
    );
  }
};
var Helmet = (_b = class extends Component {
  shouldComponentUpdate(nextProps) {
    return !fastCompare(without(this.props, "helmetData"), without(nextProps, "helmetData"));
  }
  mapNestedChildrenToProps(child, nestedChildren) {
    if (!nestedChildren) {
      return null;
    }
    switch (child.type) {
      case "script":
      case "noscript":
        return {
          innerHTML: nestedChildren
        };
      case "style":
        return {
          cssText: nestedChildren
        };
      default:
        throw new Error(
          `<${child.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`
        );
    }
  }
  flattenArrayTypeChildren(child, arrayTypeChildren, newChildProps, nestedChildren) {
    return {
      ...arrayTypeChildren,
      [child.type]: [
        ...arrayTypeChildren[child.type] || [],
        {
          ...newChildProps,
          ...this.mapNestedChildrenToProps(child, nestedChildren)
        }
      ]
    };
  }
  mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren) {
    switch (child.type) {
      case "title":
        return {
          ...newProps,
          [child.type]: nestedChildren,
          titleAttributes: { ...newChildProps }
        };
      case "body":
        return {
          ...newProps,
          bodyAttributes: { ...newChildProps }
        };
      case "html":
        return {
          ...newProps,
          htmlAttributes: { ...newChildProps }
        };
      default:
        return {
          ...newProps,
          [child.type]: { ...newChildProps }
        };
    }
  }
  mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
    let newFlattenedProps = { ...newProps };
    Object.keys(arrayTypeChildren).forEach((arrayChildName) => {
      newFlattenedProps = {
        ...newFlattenedProps,
        [arrayChildName]: arrayTypeChildren[arrayChildName]
      };
    });
    return newFlattenedProps;
  }
  warnOnInvalidChildren(child, nestedChildren) {
    invariant(
      VALID_TAG_NAMES.some((name) => child.type === name),
      typeof child.type === "function" ? `You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.` : `Only elements types ${VALID_TAG_NAMES.join(
        ", "
      )} are allowed. Helmet does not support rendering <${child.type}> elements. Refer to our API for more information.`
    );
    invariant(
      !nestedChildren || typeof nestedChildren === "string" || Array.isArray(nestedChildren) && !nestedChildren.some((nestedChild) => typeof nestedChild !== "string"),
      `Helmet expects a string as a child of <${child.type}>. Did you forget to wrap your children in braces? ( <${child.type}>{\`\`}</${child.type}> ) Refer to our API for more information.`
    );
    return true;
  }
  mapChildrenToProps(children, newProps) {
    let arrayTypeChildren = {};
    React4.Children.forEach(children, (child) => {
      if (!child || !child.props) {
        return;
      }
      const { children: nestedChildren, ...childProps } = child.props;
      const newChildProps = Object.keys(childProps).reduce((obj, key) => {
        obj[HTML_TAG_MAP[key] || key] = childProps[key];
        return obj;
      }, {});
      let { type } = child;
      if (typeof type === "symbol") {
        type = type.toString();
      } else {
        this.warnOnInvalidChildren(child, nestedChildren);
      }
      switch (type) {
        case "Symbol(react.fragment)":
          newProps = this.mapChildrenToProps(nestedChildren, newProps);
          break;
        case "link":
        case "meta":
        case "noscript":
        case "script":
        case "style":
          arrayTypeChildren = this.flattenArrayTypeChildren(
            child,
            arrayTypeChildren,
            newChildProps,
            nestedChildren
          );
          break;
        default:
          newProps = this.mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren);
          break;
      }
    });
    return this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
  }
  render() {
    const { children, ...props } = this.props;
    let newProps = { ...props };
    let { helmetData } = props;
    if (children) {
      newProps = this.mapChildrenToProps(children, newProps);
    }
    if (helmetData && !(helmetData instanceof HelmetData)) {
      const data = helmetData;
      helmetData = new HelmetData(data.context, true);
      delete newProps.helmetData;
    }
    if (isReact19) {
      return /* @__PURE__ */ React4.createElement(React19Dispatcher, { ...newProps });
    }
    return helmetData ? /* @__PURE__ */ React4.createElement(HelmetDispatcher, { ...newProps, context: helmetData.value }) : /* @__PURE__ */ React4.createElement(Context.Consumer, null, (context) => /* @__PURE__ */ React4.createElement(HelmetDispatcher, { ...newProps, context }));
  }
}, __publicField(_b, "defaultProps", {
  defer: true,
  encodeSpecialCharacters: true,
  prioritizeSeoTags: false
}), _b);
const CSS$2 = `
  .cs-wrap    { position: relative; width: 100%; font-family: 'Plus Jakarta Sans', sans-serif; }

  .cs-trigger {
    width: 100%; display: flex; align-items: center; gap: 8px;
    padding: 9px 13px; border-radius: 10px; border: 2px solid #E5E2DE;
    background: #fff; font-size: 13px; color: #1a1a2e;
    cursor: pointer; transition: border-color .2s, box-shadow .2s;
    text-align: left; outline: none;
  }
  .cs-trigger.open, .cs-trigger:focus {
    border-color: #EC5F36;
    box-shadow: 0 0 0 3px rgba(236,95,54,0.10);
  }
  .cs-trigger-placeholder { color: #d1c9c5; flex: 1; font-size: 13px; }
  .cs-trigger-value       { color: #1a1a2e; flex: 1; font-size: 13px; font-weight: 600; }
  .cs-trigger-chevron     { color: #9ca3af; flex-shrink: 0; transition: transform .2s; }
  .cs-trigger-chevron.open { transform: rotate(180deg); }

  .cs-clear {
    background: none; border: none; cursor: pointer; padding: 2px;
    display: flex; align-items: center; color: #9ca3af;
    border-radius: 4px; transition: color .15s;
  }
  .cs-clear:hover { color: #EC5F36; }

  /* Portal dropdown — fixed position, very high z-index */
  .cs-dropdown {
    position: fixed;
    height: 14rem;
    background: #fff; border: 2px solid #EC5F36;
    border-radius: 12px; box-shadow: 0 12px 36px rgba(236,95,54,0.20);
    z-index: 99999; overflow: hidden;
    animation: cs-pop .15s ease-out;
    box-sizing: border-box;
    max-width: calc(100vw - 16px);
  }
  @keyframes cs-pop {
    from { opacity: 0; transform: translateY(-6px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0)   scale(1);    }
  }

  .cs-search-wrap {
    display: flex; align-items: center; gap: 8px;
    padding: 9px 12px; border-bottom: 1px solid #F0EBE8;
    background: #FFF8F5;
  }
  .cs-search-ico { color: #EC5F36; flex-shrink: 0; }
  .cs-search-inp {
    flex: 1; border: none; background: transparent; outline: none;
    font-size: 13px; color: #1a1a2e;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-width: 0;
  }
  .cs-search-inp::placeholder { color: #d1c9c5; }

  .cs-count {
    padding: 5px 13px 6px; font-size: 10px; font-weight: 700;
    color: #9ca3af; letter-spacing: .04em; text-transform: uppercase;
    border-bottom: 1px solid #F0EBE8; background: #FAFAFA;
  }

  .cs-list {
    max-height: 180px; overflow-y: auto; overflow-x: hidden;
    -webkit-overflow-scrolling: touch; /* smooth scroll on iOS */
    scrollbar-width: thin; scrollbar-color: #F0E8E4 transparent;
  }
  .cs-list::-webkit-scrollbar       { width: 3px; }
  .cs-list::-webkit-scrollbar-thumb { background: #F0E8E4; border-radius: 4px; }

  .cs-item {
    display: flex; align-items: center; gap: 8px;
    padding: 9px 13px; cursor: pointer; font-size: 13px;
    color: #374151; font-weight: 500; transition: background .12s;
    border: none; background: none; width: 100%; text-align: left;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .cs-item:hover      { background: #FFF2EE; color: #EC5F36; }
  .cs-item.active     { background: #FFF2EE; color: #EC5F36; font-weight: 700; }
  .cs-item-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #EC5F36; flex-shrink: 0; opacity: 0;
  }
  .cs-item.active .cs-item-dot { opacity: 1; }

  .cs-empty {
    padding: 16px; text-align: center;
    font-size: 12px; color: #9ca3af; font-weight: 500;
  }
`;
function CitySelect({
  value,
  onChange,
  placeholder = "Select city"
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const wrapRef = useRef(null);
  const triggerRef = useRef(null);
  const searchRef = useRef(null);
  useEffect(() => {
    if (!open || cities.length > 0) return;
    import("./assets/indianCities-DY7eSUfy.js").then((module) => {
      const sorted = module.default.indianCities.sort(
        (a, b) => a.localeCompare(b)
      );
      setCities(sorted);
    });
  }, [open]);
  const allCities = cities;
  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const dropdownHeight = 280;
    const dropdownWidth = Math.max(rect.width, 200);
    const GUTTER = 8;
    const openUpward = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;
    const rawLeft = rect.left;
    const maxLeft = window.innerWidth - dropdownWidth - GUTTER;
    const clampedLeft = Math.max(GUTTER, Math.min(rawLeft, maxLeft));
    setDropdownStyle({
      left: clampedLeft,
      width: dropdownWidth,
      ...openUpward ? { bottom: window.innerHeight - rect.top + 4, top: "auto" } : { top: rect.bottom + 4 }
    });
  };
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target) && !e.target.closest(".cs-dropdown")) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  useEffect(() => {
    if (!open) return;
    const handler = () => updatePosition();
    window.addEventListener("scroll", handler, true);
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler, true);
      window.removeEventListener("resize", handler);
    };
  }, [open]);
  useEffect(() => {
    if (open) {
      updatePosition();
      setTimeout(() => searchRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allCities;
    const startsWith = allCities.filter((c) => c.toLowerCase().startsWith(q));
    const contains = allCities.filter(
      (c) => !c.toLowerCase().startsWith(q) && c.toLowerCase().includes(q)
    );
    return [...startsWith, ...contains];
  }, [query, allCities]);
  const select = (city) => {
    onChange(city);
    setOpen(false);
    setQuery("");
  };
  const dropdown = open ? /* @__PURE__ */ jsxs("div", { className: "cs-dropdown", style: dropdownStyle, children: [
    /* @__PURE__ */ jsxs("div", { className: "cs-search-wrap", children: [
      /* @__PURE__ */ jsx(Search, { size: 14, className: "cs-search-ico", strokeWidth: 2 }),
      /* @__PURE__ */ jsx(
        "input",
        {
          ref: searchRef,
          className: "cs-search-inp",
          placeholder: "Search city…",
          value: query,
          onChange: (e) => setQuery(e.target.value)
        }
      ),
      query && /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "cs-clear",
          onClick: () => setQuery(""),
          children: /* @__PURE__ */ jsx(X, { size: 11, strokeWidth: 2.5 })
        }
      )
    ] }),
    query && filtered.length > 0 && /* @__PURE__ */ jsxs("div", { className: "cs-count", children: [
      filtered.length,
      " result",
      filtered.length !== 1 ? "s" : ""
    ] }),
    /* @__PURE__ */ jsx("div", { className: "cs-list", children: cities.length === 0 ? /* @__PURE__ */ jsx("div", { className: "cs-empty", children: "Loading cities..." }) : filtered.length > 0 ? filtered.map((city) => /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        className: `cs-item${value === city ? " active" : ""}`,
        onClick: () => select(city),
        children: [
          /* @__PURE__ */ jsx("span", { className: "cs-item-dot" }),
          city
        ]
      },
      city
    )) : /* @__PURE__ */ jsxs("div", { className: "cs-empty", children: [
      "No city found for “",
      query,
      "”"
    ] }) })
  ] }) : null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("style", { children: CSS$2 }),
    /* @__PURE__ */ jsxs("div", { className: "cs-wrap", ref: wrapRef, children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          ref: triggerRef,
          type: "button",
          className: `cs-trigger${open ? " open" : ""}`,
          onClick: () => setOpen((o) => !o),
          children: [
            /* @__PURE__ */ jsx(
              MapPin,
              {
                size: 14,
                color: value ? "#EC5F36" : "#d1c9c5",
                strokeWidth: 2,
                style: { flexShrink: 0 }
              }
            ),
            value ? /* @__PURE__ */ jsx("span", { className: "cs-trigger-value", children: value }) : /* @__PURE__ */ jsx("span", { className: "cs-trigger-placeholder", children: placeholder }),
            value && /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "cs-clear",
                onClick: (e) => {
                  e.stopPropagation();
                  onChange("");
                },
                "aria-label": "Clear city",
                children: /* @__PURE__ */ jsx(X, { size: 12, strokeWidth: 2.5 })
              }
            ),
            /* @__PURE__ */ jsx(
              ChevronDown,
              {
                size: 14,
                className: `cs-trigger-chevron${open ? " open" : ""}`,
                strokeWidth: 2.5
              }
            )
          ]
        }
      ),
      createPortal(dropdown, document.body)
    ] })
  ] });
}
const CDN = "https://res.cloudinary.com/dhtzknkdr/image/upload";
const SERVICES = [
  {
    id: "Live-In Support",
    label: "Live-In Support",
    image: `${CDN}/v1773034359/house-manager_by4krx.webp`,
    color: "#FBBF24",
    emoji: "🏡"
  },
  {
    id: "Baby Caretaker",
    label: "Baby Caretaker",
    image: `${CDN}/v1773034351/baby-caretaker_qtcpvn.webp`,
    color: "#A78BFA",
    emoji: "👶"
  },
  {
    id: "Japa",
    label: "Japa",
    image: `${CDN}/v1773034351/japa_kjbqeu.webp`,
    color: "#F472B6",
    emoji: "🤱"
  },
  {
    id: "Cooking Help",
    label: "Cooking Help",
    image: `${CDN}/v1773034353/cook_aa2ex7.webp`,
    color: "#F87C4F",
    emoji: "👨‍🍳"
  },
  {
    id: "Patient Care",
    label: "Patient Care",
    image: `${CDN}/v1773034355/elderly-household_mt1b8o.webp`,
    color: "#F87FAC",
    emoji: "🧓"
  },
  {
    id: "Driver",
    label: "Drivers",
    image: `${CDN}/v1773034355/driver_efye54.webp`,
    color: "#34D399",
    emoji: "🚗"
  }
];
const SERVICE_FORMATS$2 = [
  {
    id: "Live-In",
    label: "Live-In",
    desc: "Stays at your home full-time. Available round the clock.",
    icon: Home$1
  },
  {
    id: "Substitute",
    label: "Substitute",
    desc: "Short-term replacement cover for your existing staff.",
    icon: Users
  },
  {
    id: "Live-Out",
    label: "Live-Out",
    desc: "Arrives daily for set hours. Goes home in the evening.",
    icon: Clock,
    comingSoon: true
  }
];
const GENDER_OPTIONS_DATA = [
  { id: "Male", label: "Male", image: `${CDN}/v1773031904/male_wubsvs.webp` },
  {
    id: "Female",
    label: "Female",
    image: `${CDN}/v1773031900/female_zo7iwn.webp`
  },
  {
    id: "Any",
    label: "Any",
    image: `${CDN}/v1773031900/any_cvq417.webp`
  }
];
const TASKS = [
  {
    id: "Cleaning",
    label: "Cleaning",
    image: `${CDN}/v1773037121/cleaning_fszds1.webp`
  },
  {
    id: "Utensils",
    label: "Utensils",
    image: `${CDN}/v1773037127/utensils_fyurgi.webp`
  },
  {
    id: "Laundry",
    label: "Laundry",
    image: `${CDN}/v1773037122/laundry_qowye6.webp`
  },
  {
    id: "Dusting",
    label: "Dusting",
    image: `${CDN}/v1773037119/dusting_hw9vbr.webp`
  },
  {
    id: "Bathroom",
    label: "Bathroom",
    image: `${CDN}/v1773037119/bathroom_phzorr.webp`
  },
  {
    id: "Groceries",
    label: "Groceries",
    image: `${CDN}/v1773037120/grocery_teclqd.webp`
  },
  {
    id: "Other",
    label: "Other",
    image: `${CDN}/v1773034370/other_s1pon0.webp`
  }
];
const HOUSE_SIZES = [
  { id: "1BHK", label: "1 BHK", image: `${CDN}/v1773037116/1BHK_bgzp6k.webp` },
  { id: "2BHK", label: "2 BHK", image: `${CDN}/v1773037121/2BHK_sin2om.webp` },
  { id: "3BHK", label: "3 BHK", image: `${CDN}/v1773037117/3BHK_jc54bv.webp` },
  { id: "4BHK", label: "4 BHK", image: `${CDN}/v1773037118/4BHK_vnuyup.webp` },
  {
    id: "Villa",
    label: "Villa",
    image: `${CDN}/v1773037129/villa_jextfy.webp`
  }
];
const PETS_OPTIONS$1 = [
  {
    id: "Yes",
    label: "Yes, we have pets",
    image: `${CDN}/v1773037128/pets_rdppq7.webp`
  },
  {
    id: "No",
    label: "No pets",
    image: `${CDN}/v1773037125/no-pets_ih18ap.webp`
  }
];
const MEAL_PREFS = [
  { id: "Veg", label: "Veg", image: `${CDN}/v1773037727/veg_jz5fdj.webp` },
  {
    id: "Non-Veg",
    label: "Non-Veg",
    image: `${CDN}/v1773037724/non-veg_e3ji5g.webp`
  },
  {
    id: "Both",
    label: "Both",
    image: `${CDN}/v1773037719/full-cook_yomiur.webp`
  }
];
const CUISINES = [
  {
    id: "North Indian",
    label: "North Indian",
    image: `${CDN}/v1773037726/north-indian_uxc5tl.webp`
  },
  {
    id: "South Indian",
    label: "South Indian",
    image: `${CDN}/v1773037726/south-indian_udys5o.webp`
  },
  {
    id: "Chinese",
    label: "Chinese",
    image: `${CDN}/v1773037716/chinese_dmrbhy.webp`
  },
  {
    id: "Continental",
    label: "Continental",
    image: `${CDN}/v1773037716/continental_wboery.webp`
  },
  {
    id: "Diet Food",
    label: "Diet Food",
    image: `${CDN}/v1773037715/diet_pxaiek.webp`
  },
  {
    id: "Other",
    label: "Other",
    image: `${CDN}/v1773034370/other_s1pon0.webp`
  }
];
const CHILD_DUTIES = [
  {
    id: "Feeding",
    label: "Feeding",
    image: `${CDN}/v1773038057/feeding_kvsvwk.webp`
  },
  {
    id: "Bathing",
    label: "Bathing",
    image: `${CDN}/v1773038057/bathing_bykrvq.webp`
  },
  {
    id: "Homework",
    label: "Homework",
    image: `${CDN}/v1773038059/homework_g3jbdz.webp`
  },
  {
    id: "Playtime",
    label: "Playtime",
    image: `${CDN}/v1773038058/playtime_udha2d.webp`
  },
  {
    id: "Putting to sleep",
    label: "Putting to sleep",
    image: `${CDN}/v1773038061/sleeping_uk5vqm.webp`
  },
  {
    id: "Other",
    label: "Other",
    image: `${CDN}/v1773034370/other_s1pon0.webp`
  }
];
const CHILD_AGE_RANGES = [
  {
    id: "0 - 1 Year",
    label: "0 - 1 Year"
  },
  {
    id: "2 - 5 Years",
    label: "2 - 5 Years"
  },
  {
    id: "6 - 12 Years",
    label: "6 - 12 Years"
  },
  {
    id: "13 + Years",
    label: "13 + Years"
  }
];
const CARE_NEEDED = [
  {
    id: "Basic Support",
    label: "Basic Support",
    image: `${CDN}/v1773038308/caregiver_rhozy2.webp`
  },
  {
    id: "Personal Hygiene",
    label: "Personal Hygiene",
    image: `${CDN}/v1773038311/hygiene_de4gcu.webp`
  },
  {
    id: "Mobility Support",
    label: "Mobility Support",
    image: `${CDN}/v1773038315/support_erb1uy.webp`
  },
  {
    id: "Medicine Reminders",
    label: "Medicine Reminders",
    image: `${CDN}/v1773038312/medicine_kjlkd0.webp`
  },
  {
    id: "Full Care",
    label: "Full Care",
    image: `${CDN}/v1773038310/full-help_jrxrax.webp`
  }
];
const VEHICLE_TYPES = [
  {
    id: "Manual",
    label: "Manual",
    image: `${CDN}/v1773038638/manual_f78sol.webp`
  },
  {
    id: "Automatic",
    label: "Automatic",
    image: `${CDN}/v1773038636/automatic_dmyqva.webp`
  },
  { id: "SUV", label: "SUV", image: `${CDN}/v1773038641/SUV_hzrcgr.webp` },
  {
    id: "Sedan",
    label: "Sedan",
    image: `${CDN}/v1773038639/sedan_q1xmlm.webp`
  }
];
const HOME_TYPES = [
  {
    id: "Apartment",
    label: "Apartment",
    image: `${CDN}/v1773038422/apartment_ys8rbw.webp`
  },
  {
    id: "Independent House",
    label: "Independent House",
    image: `${CDN}/v1773038451/individual_k0ko1y.webp`
  },
  {
    id: "Villa",
    label: "Villa",
    image: `${CDN}/v1773038464/villa_z0apwp.webp`
  }
];
const BUDGETS = [
  {
    id: "₹25,000+",
    label: "₹25,000+",
    desc: "Highly trained & experienced helpers"
  },
  {
    id: "₹18,000 – ₹24,999",
    label: "₹18,000 – ₹24,999",
    desc: "Trained helpers available"
  },
  {
    id: "₹15,000 – ₹17,999",
    label: "₹15,000 – ₹17,999",
    desc: "Untrained helpers"
  }
];
const URGENCY_OPTIONS$1 = [
  {
    id: "Immediately",
    label: "Immediately",
    desc: "Fast-tracked — profiles within 24 hours.",
    icon: Zap,
    color: "#EF4444"
  },
  {
    id: "Within 7–15 days",
    label: "Within 7–15 days",
    desc: "Planned start — profiles within 3–5 working days.",
    icon: CalendarClock,
    color: "#F59E0B"
  },
  {
    id: "Within 30 days",
    label: "Within 30 days",
    desc: "No rush — we'll find the best possible match.",
    icon: Clock,
    color: "#3B82F6"
  }
];
const JAPA_DUTIES = [
  {
    id: "Newborn Bath",
    label: "Newborn Bath",
    image: `${CDN}/v1773038057/bathing_bykrvq.webp`
  },
  {
    id: "Feeding Support",
    label: "Feeding Support",
    image: `${CDN}/v1773038057/feeding_kvsvwk.webp`
  },
  {
    id: "Swaddling",
    label: "Swaddling",
    image: `${CDN}/v1773038061/Swaddling_ce8kdn.webp`
  },
  {
    id: "Night Watch",
    label: "Night Watch",
    image: `${CDN}/v1773038061/sleeping_uk5vqm.webp`
  },
  {
    id: "Other",
    label: "Other",
    image: `${CDN}/v1773034370/other_s1pon0.webp`
  }
];
const JAPA_MOTHER_NEEDS = [
  {
    id: "Body Massage",
    label: "Body Massage",
    image: `${CDN}/v1773038315/body-massage_spvlzz`
  },
  {
    id: "Diet & Nutrition",
    label: "Diet & Nutrition",
    image: `${CDN}/v1773038424/cookingOversight_bonbic.webp`
  },
  {
    id: "Light Cooking",
    label: "Light Cooking",
    image: `${CDN}/v1773037719/light-cooking_bs02ym.webp`
  },
  {
    id: "Night Support",
    label: "Night Support",
    image: `${CDN}/v1773038061/night-support_sqnjvw.webp`
  },
  {
    id: "Personal Hygiene",
    label: "Personal Hygiene",
    image: `${CDN}/v1773038311/personal-hygiene_ynuc3c.webp`
  },
  {
    id: "Other",
    label: "Other",
    image: `${CDN}/v1773034370/other_s1pon0.webp`
  }
];
const PLANS = {
  priority: {
    id: "Priority",
    name: "Priority Pay",
    tag: "Fast-Track Hiring",
    subtitle: "Pay Before Trial",
    amount: 3e3,
    gst: Math.round(3e3 * 0.18),
    color: "#EC5F36",
    accentLight: "#FFF7F4",
    borderColor: "#F5D8CF",
    badgeBg: "linear-gradient(135deg,#EC5F36,#D84E28)",
    recommended: true,
    inclusions: [
      {
        icon: "bolt",
        label: "Priority Handling",
        desc: "Your requirement is fast-tracked over regular requests."
      },
      {
        icon: "id-card",
        label: "3 Verified Profiles within 24 Hours",
        desc: "Carefully shortlisted based on your requirement."
      },
      {
        icon: "user-check",
        label: "Pre-Screened & Relevant Matches",
        desc: "Profiles shared after verification, experience check, and suitability."
      },
      {
        icon: "headset",
        label: "End-to-End Coordination",
        desc: "Calls, interviews, and trial setup managed by our team."
      },
      {
        icon: "handshake",
        label: "Profile Finalization Support",
        desc: "Guidance in selecting the most suitable candidate."
      },
      {
        icon: "rotate",
        label: "15-Day Free Look Period",
        desc: "One free replacement within 15 days if required."
      },
      {
        icon: "gauge-high",
        label: "Quick Turnaround Time",
        desc: "Faster closures compared to standard plans."
      }
    ],
    bonus: "One free replacement within 15 days if required."
  },
  commitment: {
    id: "Commitment",
    name: "Commitment Plan",
    tag: "Standard Hiring",
    subtitle: "Commitment-Based Start",
    amount: 1500,
    gst: Math.round(1500 * 0.18),
    color: "#3B82F6",
    accentLight: "#EFF6FF",
    borderColor: "#BFDBFE",
    badgeBg: "linear-gradient(135deg,#3B82F6,#2563EB)",
    recommended: false,
    inclusions: [
      {
        icon: "credit-card",
        label: "Commitment Fee (Upfront)",
        desc: "Nominal fee before profiles — ensures serious intent."
      },
      {
        icon: "id-card",
        label: "2 Verified Profiles between 24-48 Hours",
        desc: "Carefully shortlisted based on your requirement."
      },
      {
        icon: "address-card",
        label: "Curated Profile Sharing",
        desc: "Relevant profiles shared based on your requirement."
      },
      {
        icon: "filter",
        label: "Basic Screening & Matching",
        desc: "Candidates filtered for experience and suitability."
      },
      {
        icon: "headset",
        label: "End-to-End Coordination",
        desc: "Interview scheduling and communication handled by our team."
      },
      {
        icon: "bullseye",
        label: "Finalization Support",
        desc: "Guidance to help you select the right candidate."
      },
      {
        icon: "clock",
        label: "Standard Timeline",
        desc: "Profiles shared within 3 working days."
      }
    ],
    bonus: null
  },
  noPay: {
    id: "No Pay",
    name: "Continue Without Pay",
    tag: "Basic Access",
    subtitle: "No upfront payment",
    amount: 0,
    gst: 0,
    color: "#9CA3AF",
    accentLight: "#F9FAFB",
    borderColor: "#E5E7EB",
    badgeBg: "linear-gradient(135deg,#9CA3AF,#6B7280)",
    recommended: false,
    inclusions: [
      {
        icon: "clock",
        label: "Delayed Profile Sharing",
        desc: "Profiles shared only after priority requests are fulfilled."
      },
      {
        icon: "users",
        label: "Limited Matches",
        desc: "Fewer profiles based on availability."
      },
      {
        icon: "ban",
        label: "No Replacement Support",
        desc: "No free replacements or dedicated assistance."
      }
    ],
    bonus: null
  }
};
const SERVICE_FLOWS = {
  "Live-In Support": [
    "service",
    "format",
    "tasks",
    "housesize",
    "pets",
    "helpergender",
    "budget",
    "urgency",
    "contact",
    "plan",
    "done"
  ],
  "Cooking Help": [
    "service",
    "format",
    "mealpref",
    "cuisine",
    "cookmembers",
    "helpergender",
    "budget",
    "urgency",
    "contact",
    "plan",
    "done"
  ],
  "Baby Caretaker": [
    "service",
    "format",
    "childage",
    "childduties",
    "helpergender",
    "budget",
    "urgency",
    "contact",
    "plan",
    "done"
  ],
  Japa: [
    "service",
    "format",
    "japaduties",
    "japamotherneeds",
    "helpergender",
    "budget",
    "urgency",
    "contact",
    "plan",
    "done"
  ],
  "Patient Care": [
    "service",
    "format",
    "patientage",
    "patientgender",
    "careneeded",
    "helpergender",
    "budget",
    "urgency",
    "contact",
    "plan",
    "done"
  ],
  Driver: [
    "service",
    "format",
    "vehicletype",
    "helpergender",
    "budget",
    "urgency",
    "contact",
    "plan",
    "done"
  ]
};
const DEFAULT_FLOW = [
  "service",
  "urgency",
  "helpergender",
  "budget",
  "contact",
  "plan",
  "done"
];
const PROG_META = {
  service: { label: "Service", icon: Briefcase },
  format: { label: "Format", icon: Layers },
  tasks: { label: "Tasks", icon: Layers },
  housesize: { label: "Home", icon: Home$1 },
  pets: { label: "Pets", icon: PawPrint },
  mealpref: { label: "Diet", icon: Utensils },
  mealtime: { label: "Meals", icon: Coffee },
  cuisine: { label: "Cuisine", icon: ChefHat },
  cookmembers: { label: "Members", icon: Users },
  helpergender: { label: "Helper", icon: ChefHat },
  childage: { label: "Child", icon: Baby },
  childduties: { label: "Duties", icon: ClipboardList },
  patientage: { label: "Patient", icon: HeartPulse },
  patientgender: { label: "Gender", icon: UserCheck },
  careneeded: { label: "Care", icon: HandHeart },
  vehicletype: { label: "Vehicle", icon: Car },
  hometype: { label: "Home", icon: Home$1 },
  multiservices: { label: "Services", icon: Sparkles },
  urgency: { label: "Urgency", icon: Zap },
  budget: { label: "Budget", icon: DollarSign },
  contact: { label: "Contact", icon: Phone },
  plan: { label: "Plan", icon: CreditCard },
  // Japa
  japaduties: { label: "Duties", icon: HandHeart },
  japamotherneeds: { label: "Mother", icon: HeartPulse }
};
const INIT$3 = {
  // Contact
  FirstName: "",
  LastName: "",
  Email: "",
  Phone: "",
  Street: "",
  City: "",
  // Service
  ServiceType: "",
  ServiceLabel: "",
  ServiceFormat: "",
  // Live-in
  Tasks: [],
  HouseSize: "",
  PeopleAtHome: 3,
  PetsAtHome: "",
  HomeType: "",
  // Cook
  MealPref: "",
  MealsNeeded: [],
  CuisinePref: [],
  HelperGender: "",
  CookMembers: 0,
  // Baby Caretaker
  ChildAge: "",
  ChildDuties: [],
  // Japa
  JapaDuties: [],
  JapaMotherNeeds: [],
  // Patient Care
  PatientAge: "",
  PatientGender: "",
  CareNeeded: [],
  // Driver
  VehicleType: [],
  // Common
  Budget: "",
  Urgency: "",
  Instructions: "",
  // Plan
  PlanType: "",
  PaymentStatus: ""
};
const API_BASE$4 = "http://localhost:8000";
const INTERNAL_SECRET = "3ceaa28f51895b27c329577b1c37ae92189afe56ae4baa9bcef20490b1fca9b7";
const ICON_MAP = {
  "bolt": Zap,
  "id-card": IdCard,
  "user-check": UserCheck,
  "headset": Headphones,
  "handshake": Handshake,
  "rotate": RotateCcw,
  "gauge-high": Gauge,
  "credit-card": CreditCard,
  "address-card": ContactRound,
  "filter": Filter,
  "bullseye": Target,
  "clock": Clock,
  "gift": Gift,
  "check": Check,
  "circle-check": CircleCheck,
  "phone": Phone,
  "users": Users,
  "ban": Ban
};
const createCashfreeOrder = async ({ plan, customer, zohoFields, dropLeadId }) => {
  const res = await fetch(`${API_BASE$4}/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan, customer, zohoFields, dropLeadId })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Order creation failed");
  return data;
};
const submitNoPay = async (zohoFields) => {
  const res = await fetch(`${API_BASE$4}/submit-nopay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-internal-secret": INTERNAL_SECRET
    },
    body: JSON.stringify({ zohoFields })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Server error ${res.status}`);
  return data;
};
function HeroWizard({ asModal = false, isOpen = true, onClose, onSubmit, initialService, initialFormat }) {
  const getInitialState = () => {
    if (initialService) {
      const svc = SERVICES.find((s2) => s2.id === initialService);
      if (svc) {
        return {
          ...INIT$3,
          ServiceType: svc.id,
          ServiceLabel: svc.label,
          ...initialFormat ? { ServiceFormat: initialFormat } : {}
        };
      }
    }
    return { ...INIT$3 };
  };
  const getInitialStep = () => {
    if (!initialService) return 0;
    const svc = SERVICES.find((s2) => s2.id === initialService);
    if (!svc) return 0;
    const flow = SERVICE_FLOWS[initialService] || DEFAULT_FLOW;
    if (initialFormat) {
      const formatIdx = flow.indexOf("format");
      return formatIdx >= 0 ? formatIdx + 1 : 1;
    }
    return 1;
  };
  const [stepIdx, setStepIdx] = useState(getInitialStep);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState(getInitialState);
  const [planSubmitting, setPlanSubmitting] = useState(false);
  const [paymentStage, setPaymentStage] = useState("idle");
  const [activeTab, setActiveTab] = useState("priority");
  const [dropLeadId, setDropLeadId] = useState(
    () => sessionStorage.getItem("dp_drop_lead_id") || ""
  );
  const [submitError, setSubmitError] = useState("");
  const bodyRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      setStepIdx(getInitialStep());
      setForm(getInitialState());
      setDir(1);
      setPlanSubmitting(false);
      setPaymentStage("idle");
      setActiveTab("priority");
      setSubmitError("");
    }
  }, [isOpen, initialService, initialFormat]);
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [stepIdx, form.ServiceType]);
  const selectService = (svc) => {
    setForm({ ...INIT$3, ServiceType: svc.id, ServiceLabel: svc.label });
    setDir(1);
    setStepIdx(1);
  };
  const steps2 = (() => {
    const base = form.ServiceType ? SERVICE_FLOWS[form.ServiceType] || DEFAULT_FLOW : DEFAULT_FLOW;
    return base.filter((k) => k !== "plan");
  })();
  const curKey = steps2[stepIdx] ?? "service";
  const isDone = curKey === "done";
  const progKeys = steps2.filter((k) => k !== "done");
  const progIdx = isDone ? progKeys.length : progKeys.indexOf(curKey);
  const progPct = progKeys.length <= 1 ? 0 : Math.round(Math.max(0, progIdx) / (progKeys.length - 1) * 100);
  const setF = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleArr = (k, v) => setForm((f) => ({
    ...f,
    [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v]
  }));
  const goNext = () => {
    if (curKey === "contact" && isValid()) {
      {
        handleNopayDirectSubmit();
        return;
      }
    }
    setDir(1);
    setStepIdx((i) => Math.min(i + 1, steps2.length - 1));
  };
  const goBack = () => {
    setDir(-1);
    setStepIdx((i) => Math.max(i - 1, 0));
  };
  const after = (ms = 220) => setTimeout(goNext, ms);
  const handleNopayDirectSubmit = async () => {
    setPlanSubmitting(true);
    setSubmitError("");
    try {
      const zohoFields = buildZohoFields2({
        ...form,
        PlanType: "Priority",
        PaymentStatus: "Paid"
      });
      const result = await submitNoPay(zohoFields);
      onSubmit?.(zohoFields, result);
      const doneIdx = steps2.indexOf("done");
      setDir(1);
      setStepIdx(doneIdx);
    } catch (err) {
      setSubmitError(
        err.message.includes("VITE_REACT_APP_API") ? "Backend URL not configured. Set VITE_REACT_APP_API in your .env file." : "We couldn't save your request. Please try again or call us on +91 92112 98139."
      );
    }
    setPlanSubmitting(false);
  };
  const resetWizard = () => {
    setStepIdx(getInitialStep());
    setDir(1);
    setForm(getInitialState());
    setPlanSubmitting(false);
    setPaymentStage("idle");
    setActiveTab("priority");
    setSubmitError("");
    setDropLeadId("");
    sessionStorage.removeItem("dp_drop_lead_id");
  };
  const isValid = () => {
    switch (curKey) {
      case "service":
        return !!form.ServiceType;
      case "tasks":
        return form.Tasks.length > 0;
      case "housesize":
        return !!form.HouseSize;
      case "pets":
        return !!form.PetsAtHome;
      case "mealpref":
        return !!form.MealPref;
      case "cookmembers":
        return form.CookMembers > 0;
      case "cuisine":
        return form.CuisinePref.length > 0;
      case "helpergender":
        return !!form.HelperGender;
      case "childage":
        return !!form.ChildAge.trim();
      case "childduties":
        return form.ChildDuties.length > 0;
      case "patientage":
        return !!form.PatientAge.trim();
      case "patientgender":
        return !!form.PatientGender;
      case "careneeded":
        return form.CareNeeded.length > 0;
      case "vehicletype":
        return form.VehicleType.length > 0;
      case "hometype":
        return !!form.HomeType;
      case "urgency":
        return !!form.Urgency;
      case "budget":
        return !!form.Budget;
      case "japaduties":
        return form.JapaDuties.length > 0;
      case "japamotherneeds":
        return form.JapaMotherNeeds.length > 0;
      case "contact":
        return form.FirstName.trim() !== "" && form.Phone.length === 10 && /^[6-9]/.test(form.Phone) && form.Street.trim() !== "" && form.City.trim() !== "";
      case "plan":
        return !!form.PlanType;
      default:
        return true;
    }
  };
  const CONT_KEYS = /* @__PURE__ */ new Set([
    "tasks",
    "cuisine",
    "childduties",
    "careneeded",
    "vehicletype",
    "contact",
    "housesize",
    "mealpref",
    "cookmembers",
    "helpergender",
    "urgency",
    "budget",
    "patientage",
    "childage",
    "patientgender",
    "hometype",
    "plan",
    "japaduties",
    "japamotherneeds"
  ]);
  const showContinue = CONT_KEYS.has(curKey);
  function buildZohoFields2(f) {
    return {
      Full_Name: `${f.FirstName} ${f.LastName}`.trim(),
      First_Name: f.FirstName,
      Last_Name: f.LastName,
      Mobile_Number: f.Phone,
      Email: f.Email,
      Street_Address: f.Street,
      City: f.City,
      Service_Type: f.ServiceType,
      Service_Format: f.ServiceFormat,
      Tasks_Needed: f.Tasks,
      House_Size: f.HouseSize,
      People_At_Home: f.PeopleAtHome,
      Pets_At_Home: f.PetsAtHome,
      Meal_Preferences: f.MealPref,
      Cuisine_Preference: f.CuisinePref,
      Helper_s_Gender: f.HelperGender,
      Cook_Members: String(f.CookMembers),
      Child_Age: f.ChildAge,
      Child_Duties: f.ChildDuties,
      Japa_Child_Duties: f.JapaDuties,
      Japa_Mother_Duties: f.JapaMotherNeeds,
      Patient_Age: f.PatientAge,
      Patient_Gender: f.PatientGender,
      Care_Needed: f.CareNeeded,
      Vehicle_Type: f.VehicleType,
      Monthly_Budget: f.Budget,
      Urgency: f.Urgency,
      Special_Instructions: f.Instructions,
      Plan_Type: f.PlanType,
      Payment_Status: f.PaymentStatus
    };
  }
  const upgradeDropLead = async (finalPlanType, paymentStatus, orderId = null) => {
    const savedDropId = dropLeadId || sessionStorage.getItem("dp_drop_lead_id");
    if (!savedDropId) return;
    try {
      await fetch(`${API_BASE$4}/update-lead/${savedDropId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Plan_Type: finalPlanType,
          Payment_Status: paymentStatus,
          ...orderId ? { Order_ID: orderId } : {}
        })
      });
      sessionStorage.removeItem("dp_drop_lead_id");
      setDropLeadId("");
    } catch (err) {
      console.warn("[CART-DROP] Upgrade failed (non-fatal):", err.message);
    }
  };
  const handlePlanSubmit = async (planType) => {
    if (!planType || planSubmitting) return;
    setF("PlanType", planType);
    setSubmitError("");
    setPlanSubmitting(true);
    if (planType === "Priority" || planType === "Commitment") {
      try {
        setPaymentStage("creating_order");
        const savedDropId = dropLeadId || sessionStorage.getItem("dp_drop_lead_id");
        const zohoFields = buildZohoFields2({ ...form, PlanType: planType });
        const order = await createCashfreeOrder({
          plan: planType,
          customer: {
            name: `${form.FirstName} ${form.LastName}`.trim(),
            email: form.Email || `${form.Phone}@noemail.com`,
            phone: form.Phone
          },
          zohoFields,
          dropLeadId: savedDropId
        });
        if (savedDropId) {
          await upgradeDropLead(planType, "Payment Initiated", order.order_id);
        }
        sessionStorage.setItem("dp_order_id", order.order_id);
        sessionStorage.setItem("dp_plan", planType);
        sessionStorage.setItem("dp_customer_phone", form.Phone);
        setPaymentStage("redirecting");
        const { load } = await import("@cashfreepayments/cashfree-js");
        const cashfree = await load({ mode: order.cashfreeMode || "production" });
        await cashfree.checkout({ paymentSessionId: order.payment_session_id, redirectTarget: "_self" });
      } catch (err) {
        setPaymentStage("idle");
        setPlanSubmitting(false);
        setSubmitError(
          err.message.includes("VITE_REACT_APP_API") ? "Backend URL not configured. Set VITE_REACT_APP_API in your .env file." : `Payment failed to initialise: ${err.message}. Please try again.`
        );
      }
      return;
    }
    if (planType === "No Pay") {
      const savedDropId = dropLeadId || sessionStorage.getItem("dp_drop_lead_id");
      try {
        if (savedDropId) {
          await upgradeDropLead("No Pay", "No Payment — Basic Access");
        } else {
          const zohoFields = buildZohoFields2({
            ...form,
            PlanType: "No Pay",
            PaymentStatus: "No Payment — Basic Access"
          });
          const result = await submitNoPay(zohoFields);
          onSubmit?.(zohoFields, result);
        }
        const currentSteps = form.ServiceType ? SERVICE_FLOWS[form.ServiceType] || DEFAULT_FLOW : DEFAULT_FLOW;
        setStepIdx(currentSteps.indexOf("done"));
      } catch (err) {
        setSubmitError(
          err.message.includes("VITE_REACT_APP_API") ? "Backend URL not configured. Set VITE_REACT_APP_API in your .env file." : "We couldn't save your request. Please try again or call us on +91 92112 98139."
        );
      }
      setPlanSubmitting(false);
    }
  };
  const QHead = ({ q, hint }) => /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
    /* @__PURE__ */ jsx("p", { className: "text-[15px] font-bold leading-snug text-[#181C2E] mb-1", children: q }),
    hint && /* @__PURE__ */ jsx("p", { className: "text-xs text-[#5B6475] font-medium leading-relaxed", children: hint })
  ] });
  const SvcCard = ({ svc, selected, onClick, className = "" }) => /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      "aria-pressed": selected,
      onClick,
      className: `hw2-svc-card ${className}`,
      style: { borderColor: selected ? svc.color : "#E5E2DE", boxShadow: selected ? `0 8px 24px ${svc.color}40` : "0 2px 8px rgba(0,0,0,0.05)" },
      children: [
        /* @__PURE__ */ jsx("img", { src: svc.image, alt: svc.label, loading: "lazy", className: "hw2-svc-img" }),
        /* @__PURE__ */ jsx("div", { className: "hw2-svc-overlay" }),
        selected && /* @__PURE__ */ jsx("div", { className: "hw2-svc-tint", style: { background: `${svc.color}33` } }),
        /* @__PURE__ */ jsx("p", { className: "hw2-svc-label", children: svc.label }),
        selected && /* @__PURE__ */ jsx("div", { className: "hw2-svc-check", style: { background: svc.color }, children: /* @__PURE__ */ jsx(Check, { size: 9, strokeWidth: 3, color: "#fff" }) })
      ]
    }
  );
  const ImgChip = ({ label, image, selected, onClick, color = "#EC5F36" }) => /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      "aria-pressed": selected,
      onClick,
      className: "hw2-svc-card",
      style: { borderColor: selected ? color : "#E5E2DE", boxShadow: selected ? `0 8px 24px ${color}40` : "0 2px 8px rgba(0,0,0,0.05)" },
      children: [
        /* @__PURE__ */ jsx("img", { src: image, alt: label, loading: "lazy", className: "hw2-svc-img" }),
        /* @__PURE__ */ jsx("div", { className: "hw2-svc-overlay" }),
        selected && /* @__PURE__ */ jsx("div", { className: "hw2-svc-tint", style: { background: `${color}33` } }),
        /* @__PURE__ */ jsx("p", { className: "hw2-svc-label", children: label }),
        selected && /* @__PURE__ */ jsx("div", { className: "hw2-svc-check", style: { background: color }, children: /* @__PURE__ */ jsx(Check, { size: 9, strokeWidth: 3, color: "#fff" }) })
      ]
    }
  );
  const GenderImgCard = ({ opt, selected, onClick }) => /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      "aria-pressed": selected,
      onClick,
      className: "hw2-gender-card",
      style: { borderColor: selected ? "#EC5F36" : "#E5E2DE", boxShadow: selected ? "0 8px 24px rgba(236,95,54,0.32)" : "0 2px 8px rgba(0,0,0,0.05)" },
      children: [
        /* @__PURE__ */ jsx("img", { src: opt.image, alt: opt.label, loading: "lazy", className: "hw2-gender-img" }),
        /* @__PURE__ */ jsx("div", { className: "hw2-gender-overlay" }),
        selected && /* @__PURE__ */ jsx("div", { className: "hw2-gender-tint" }),
        /* @__PURE__ */ jsx("p", { className: "hw2-gender-label", children: opt.label }),
        selected && /* @__PURE__ */ jsx("div", { className: "hw2-gender-check", children: /* @__PURE__ */ jsx(Check, { size: 9, strokeWidth: 3, color: "#fff" }) })
      ]
    }
  );
  const Pill = ({ icon: Icon, label, desc, selected, onClick }) => /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      "aria-pressed": selected,
      onClick,
      className: "hw2-pill",
      style: { background: selected ? "#EC5F36" : "#fff", borderColor: selected ? "#EC5F36" : "#E5E2DE", boxShadow: selected ? "0 6px 18px rgba(236,95,54,0.33)" : "0 1px 4px rgba(0,0,0,0.04)" },
      children: [
        /* @__PURE__ */ jsx("div", { className: "hw2-pill-ico", style: { background: selected ? "rgba(255,255,255,0.22)" : "#FFF2EE" }, children: /* @__PURE__ */ jsx(Icon, { size: 16, color: selected ? "#fff" : "#EC5F36", strokeWidth: 1.8 }) }),
        /* @__PURE__ */ jsxs("div", { className: "hw2-pill-txt", children: [
          /* @__PURE__ */ jsx("span", { className: "hw2-pill-label", style: { color: selected ? "#fff" : "#1a1a2e" }, children: label }),
          desc && /* @__PURE__ */ jsx("span", { className: "hw2-pill-desc", style: { color: selected ? "rgba(255,255,255,0.78)" : "#888" }, children: desc })
        ] }),
        selected && /* @__PURE__ */ jsx(Check, { size: 14, strokeWidth: 2.5, color: "#fff", className: "ml-auto flex-shrink-0" })
      ]
    }
  );
  const Stepper = ({ label, value, onDec, onInc, min = 1, max = 20 }) => /* @__PURE__ */ jsxs("div", { className: "hw2-stepper", children: [
    /* @__PURE__ */ jsx("span", { className: "hw2-step-label", children: label }),
    /* @__PURE__ */ jsxs("div", { className: "hw2-step-ctrl", children: [
      /* @__PURE__ */ jsx("button", { type: "button", onClick: onDec, disabled: value <= min, className: "hw2-step-btn", children: /* @__PURE__ */ jsx(Minus, { size: 13, strokeWidth: 2.5 }) }),
      /* @__PURE__ */ jsx("span", { className: "hw2-step-val", children: value }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: onInc, disabled: value >= max, className: "hw2-step-btn", children: /* @__PURE__ */ jsx(Plus, { size: 13, strokeWidth: 2.5 }) })
    ] })
  ] });
  const renderStep = () => {
    if (curKey === "service") return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(QHead, { q: "What type of house help do you need?", hint: "Tap to select — we'll guide you from there" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2.5 sm:gap-3", children: SERVICES.map((svc, i) => /* @__PURE__ */ jsx(
        SvcCard,
        {
          svc,
          selected: form.ServiceType === svc.id,
          className: SERVICES.length % 3 === 1 && i === SERVICES.length - 1 ? "col-start-2" : "",
          onClick: () => selectService(svc)
        },
        svc.id
      )) })
    ] });
    if (curKey === "format") return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(QHead, { q: "Choose Service Format", hint: "How would you like the service provided?" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2", children: SERVICE_FORMATS$2.map((opt) => {
        const isCS = !!opt.comingSoon;
        const sel = form.ServiceFormat === opt.id;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            disabled: isCS,
            onClick: () => {
              if (!isCS) {
                setF("ServiceFormat", opt.id);
                after();
              }
            },
            className: "hw2-pill",
            style: {
              background: isCS ? "#F9F9F9" : sel ? "#EC5F36" : "#fff",
              borderColor: isCS ? "#E5E2DE" : sel ? "#EC5F36" : "#E5E2DE",
              opacity: isCS ? 0.6 : 1,
              cursor: isCS ? "not-allowed" : "pointer"
            },
            children: [
              /* @__PURE__ */ jsx("div", { className: "hw2-pill-ico", style: { background: isCS ? "#F0F0F0" : sel ? "rgba(255,255,255,0.22)" : "#FFF2EE" }, children: /* @__PURE__ */ jsx(opt.icon, { size: 16, color: isCS ? "#bbb" : sel ? "#fff" : "#EC5F36", strokeWidth: 1.8 }) }),
              /* @__PURE__ */ jsxs("div", { className: "hw2-pill-txt", children: [
                /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 7 }, children: [
                  /* @__PURE__ */ jsx("span", { className: "hw2-pill-label", style: { color: isCS ? "#aaa" : sel ? "#fff" : "#1a1a2e" }, children: opt.label }),
                  isCS && /* @__PURE__ */ jsx("span", { style: { fontSize: 9, fontWeight: 800, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", borderRadius: 20, padding: "2px 8px" }, children: "Coming Soon" })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "hw2-pill-desc", style: { color: isCS ? "#bbb" : sel ? "rgba(255,255,255,0.78)" : "#888" }, children: opt.desc })
              ] }),
              !isCS && sel && /* @__PURE__ */ jsx(Check, { size: 14, strokeWidth: 2.5, color: "#fff", className: "ml-auto flex-shrink-0" })
            ]
          },
          opt.id
        );
      }) })
    ] });
    if (curKey === "tasks") return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(QHead, { q: "Which tasks are needed?", hint: "Select all that apply" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2.5", children: TASKS.map((t) => /* @__PURE__ */ jsx(
        ImgChip,
        {
          label: t.label,
          image: t.image,
          selected: form.Tasks.includes(t.id),
          onClick: () => toggleArr("Tasks", t.id)
        },
        t.id
      )) }),
      form.Tasks.length === 0 && /* @__PURE__ */ jsx("p", { className: "hw2-warn mt-2", children: "Pick at least one task" })
    ] });
    if (curKey === "housesize") return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(QHead, { q: "What's your home size?", hint: "Helps us estimate effort & staff" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2.5", children: HOUSE_SIZES.map((h) => /* @__PURE__ */ jsx(
        ImgChip,
        {
          label: h.label,
          image: h.image,
          selected: form.HouseSize === h.id,
          onClick: () => setF("HouseSize", h.id)
        },
        h.id
      )) })
    ] });
    if (curKey === "pets") return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(QHead, { q: "Do you have pets at home?", hint: "Some helpers prefer no pets" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3 mt-1", children: PETS_OPTIONS$1.map((o) => /* @__PURE__ */ jsx(
        ImgChip,
        {
          label: o.label,
          image: o.image,
          selected: form.PetsAtHome === o.id,
          onClick: () => {
            setF("PetsAtHome", o.id);
            after();
          }
        },
        o.id
      )) })
    ] });
    if (curKey === "hometype") return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(QHead, { q: "What type of home?" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2.5", children: HOME_TYPES.map((h) => /* @__PURE__ */ jsx(
        ImgChip,
        {
          label: h.label,
          image: h.image,
          selected: form.HomeType === h.id,
          onClick: () => {
            setF("HomeType", h.id);
            after();
          }
        },
        h.id
      )) })
    ] });
    if (curKey === "mealpref") return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(QHead, { q: "Dietary preference?", hint: "Helps match the right cook" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2.5", children: MEAL_PREFS.map((m) => /* @__PURE__ */ jsx(
        ImgChip,
        {
          label: m.label,
          image: m.image,
          selected: form.MealPref === m.id,
          onClick: () => {
            setF("MealPref", m.id);
            after();
          }
        },
        m.id
      )) })
    ] });
    if (curKey === "cuisine") return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(QHead, { q: "Cuisine preference?" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2.5", children: CUISINES.map((c) => /* @__PURE__ */ jsx(
        ImgChip,
        {
          label: c.label,
          image: c.image,
          selected: form.CuisinePref.includes(c.id),
          onClick: () => toggleArr("CuisinePref", c.id)
        },
        c.id
      )) }),
      form.CuisinePref.length === 0 && /* @__PURE__ */ jsx("p", { className: "hw2-warn mt-2", children: "Pick at least one" })
    ] });
    if (curKey === "helpergender") return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(QHead, { q: "Helper's preferences" }),
      /* @__PURE__ */ jsxs("p", { className: "text-[13px] font-bold text-[#181C2E] mb-3", children: [
        "Preferred ",
        form.ServiceType.toLowerCase(),
        "'s gender"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3", children: GENDER_OPTIONS_DATA.map((g) => {
        const sel = form.HelperGender === g.id;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            "aria-pressed": sel,
            onClick: () => {
              setF("HelperGender", g.id);
              after();
            },
            className: "relative overflow-hidden rounded-2xl border-2 transition-all duration-200",
            style: {
              borderColor: sel ? "#EC5F36" : "#E5E2DE",
              boxShadow: sel ? "0 6px 20px rgba(236,95,54,0.25)" : "0 2px 8px rgba(0,0,0,0.05)",
              aspectRatio: "1 / 1",
              padding: 0
            },
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: g.image,
                  alt: g.label,
                  loading: "lazy",
                  style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }
                }
              ),
              /* @__PURE__ */ jsx("div", { style: { position: "absolute", inset: 0, background: sel ? "rgba(236,95,54,0.22)" : "rgba(0,0,0,0.08)", transition: "background .2s" } }),
              /* @__PURE__ */ jsx("div", { style: { position: "absolute", bottom: 0, left: 0, right: 0, padding: "6px 4px", background: sel ? "rgba(236,95,54,0.82)" : "rgba(0,0,0,0.45)", textAlign: "center" }, children: /* @__PURE__ */ jsx("span", { style: { fontSize: 12, fontWeight: 800, color: "#fff", letterSpacing: ".01em" }, children: g.label }) }),
              sel && /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: 7, right: 7, width: 20, height: 20, borderRadius: "50%", background: "#EC5F36", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.25)" }, children: /* @__PURE__ */ jsx(Check, { size: 10, strokeWidth: 3, color: "#fff" }) })
            ]
          },
          g.id
        );
      }) })
    ] });
    if (curKey === "cookmembers") return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(QHead, { q: "How many members to cook for?" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-3 mt-2", children: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => {
        const sel = form.CookMembers === n;
        return /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              setF("CookMembers", n);
              after(220);
            },
            className: "rounded-2xl border-2 py-4 text-lg font-extrabold transition-all duration-200",
            style: {
              borderColor: sel ? "#EC5F36" : "#E5E2DE",
              background: sel ? "linear-gradient(135deg,#EC5F36,#D84E28)" : "#fff",
              color: sel ? "#fff" : "#1a1a2e",
              boxShadow: sel ? "0 6px 18px rgba(236,95,54,0.30)" : "0 1px 4px rgba(0,0,0,0.04)"
            },
            children: n
          },
          n
        );
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(QHead, { q: "More than 8?", hint: "" }),
        /* @__PURE__ */ jsx(
          Stepper,
          {
            label: "Custom count",
            value: form.CookMembers > 8 ? form.CookMembers : 9,
            onDec: () => setF("CookMembers", Math.max(9, form.CookMembers - 1)),
            onInc: () => setF("CookMembers", Math.min(20, form.CookMembers + 1))
          }
        )
      ] })
    ] });
    if (curKey === "childage") return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(QHead, { q: "How old is the child?", hint: "Select the age range" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3", children: CHILD_AGE_RANGES.map((r) => /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            setF("ChildAge", r.id);
            after();
          },
          className: "hw2-budget-row",
          style: { background: form.ChildAge === r.id ? "#EC5F36" : "#fff", borderColor: form.ChildAge === r.id ? "#EC5F36" : "#E5E2DE" },
          children: [
            /* @__PURE__ */ jsx("span", { className: "hw2-budget-label", style: { color: form.ChildAge === r.id ? "#fff" : "#1a1a2e" }, children: r.label }),
            form.ChildAge === r.id && /* @__PURE__ */ jsx(Check, { size: 16, strokeWidth: 2.5, color: "#fff", className: "ml-auto flex-shrink-0" })
          ]
        },
        r.id
      )) })
    ] });
    if (curKey === "childduties") return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(QHead, { q: "What duties are needed?", hint: "Select all that apply" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2.5", children: CHILD_DUTIES.map((d) => /* @__PURE__ */ jsx(
        ImgChip,
        {
          label: d.label,
          image: d.image,
          selected: form.ChildDuties.includes(d.id),
          onClick: () => toggleArr("ChildDuties", d.id)
        },
        d.id
      )) }),
      form.ChildDuties.length === 0 && /* @__PURE__ */ jsx("p", { className: "hw2-warn mt-2", children: "Select at least one" })
    ] });
    if (curKey === "japaduties") return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(QHead, { q: "What newborn duties are needed?", hint: "Select all that apply" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2.5", children: JAPA_DUTIES.map((d) => /* @__PURE__ */ jsx(
        ImgChip,
        {
          label: d.label,
          image: d.image,
          selected: form.JapaDuties.includes(d.id),
          onClick: () => toggleArr("JapaDuties", d.id)
        },
        d.id
      )) }),
      form.JapaDuties.length === 0 && /* @__PURE__ */ jsx("p", { className: "hw2-warn mt-2", children: "Select at least one" })
    ] });
    if (curKey === "japamotherneeds") return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(QHead, { q: "What does the mother need?", hint: "Select all that apply" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2.5", children: JAPA_MOTHER_NEEDS.map((d) => /* @__PURE__ */ jsx(
        ImgChip,
        {
          label: d.label,
          image: d.image,
          selected: form.JapaMotherNeeds.includes(d.id),
          onClick: () => toggleArr("JapaMotherNeeds", d.id)
        },
        d.id
      )) }),
      form.JapaMotherNeeds.length === 0 && /* @__PURE__ */ jsx("p", { className: "hw2-warn mt-2", children: "Select at least one" })
    ] });
    if (curKey === "patientage") return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(QHead, { q: "How old is the patient?" }),
      /* @__PURE__ */ jsx("div", { className: "hw2-age-input-wrap", children: /* @__PURE__ */ jsx(
        "input",
        {
          className: "hw2-finput hw2-age-input",
          type: "number",
          min: 1,
          placeholder: "e.g. 68 years…",
          value: form.PatientAge,
          autoFocus: true,
          onChange: (e) => setF("PatientAge", e.target.value)
        }
      ) })
    ] });
    if (curKey === "patientgender") return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(QHead, { q: "Patient's gender?" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3", children: GENDER_OPTIONS_DATA.map((g) => /* @__PURE__ */ jsx(
        GenderImgCard,
        {
          opt: g,
          selected: form.PatientGender === g.id,
          onClick: () => {
            setF("PatientGender", g.id);
            after();
          }
        },
        g.id
      )) })
    ] });
    if (curKey === "careneeded") return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(QHead, { q: "What care is required?", hint: "Select all that apply" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2.5", children: CARE_NEEDED.map((c) => /* @__PURE__ */ jsx(
        ImgChip,
        {
          label: c.label,
          image: c.image,
          selected: form.CareNeeded.includes(c.id),
          onClick: () => toggleArr("CareNeeded", c.id)
        },
        c.id
      )) }),
      form.CareNeeded.length === 0 && /* @__PURE__ */ jsx("p", { className: "hw2-warn mt-2", children: "Select at least one" })
    ] });
    if (curKey === "vehicletype") return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(QHead, { q: "What vehicle(s) will the driver operate?", hint: "Select all that apply" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2.5", children: VEHICLE_TYPES.map((v) => /* @__PURE__ */ jsx(
        ImgChip,
        {
          label: v.label,
          image: v.image,
          selected: form.VehicleType.includes(v.id),
          onClick: () => toggleArr("VehicleType", v.id)
        },
        v.id
      )) }),
      form.VehicleType.length === 0 && /* @__PURE__ */ jsx("p", { className: "hw2-warn mt-2", children: "Select at least one" })
    ] });
    if (curKey === "urgency") return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(QHead, { q: "How soon do you need placement?" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2", children: URGENCY_OPTIONS$1.map((o) => /* @__PURE__ */ jsx(
        Pill,
        {
          icon: o.icon,
          label: o.label,
          desc: o.desc,
          selected: form.Urgency === o.id,
          onClick: () => {
            setF("Urgency", o.id);
            after();
          }
        },
        o.id
      )) })
    ] });
    if (curKey === "budget") {
      if (form.ServiceFormat === "Substitute") return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(QHead, { q: "Substitute Service Pricing", hint: "Here's how our substitute service works" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 mb-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-[#F1E3DE] bg-[#FFF7F4] p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-[#EC5F36] uppercase tracking-wider mb-3", children: "How It Works" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-full bg-[#EC5F36] flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsx("span", { className: "text-white text-xs font-bold", children: "1" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-[#181C2E]", children: "Domestic Pro Placement Fee" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#5B6475] leading-relaxed mt-0.5", children: [
                    "We charge a one-time fee of ",
                    /* @__PURE__ */ jsx("span", { className: "font-bold text-[#181C2E]", children: "₹5,000" }),
                    " for sourcing, verifying, and deploying a suitable substitute helper at your home."
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "w-full h-px bg-[#F1E3DE]" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-full bg-[#EC5F36] flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsx("span", { className: "text-white text-xs font-bold", children: "2" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-[#181C2E]", children: "Helper's Salary — Separate" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#5B6475] leading-relaxed mt-0.5", children: [
                    "The helper's salary is ",
                    /* @__PURE__ */ jsx("span", { className: "font-bold text-[#181C2E]", children: "not included" }),
                    " in our fee. It is agreed directly between you and the helper."
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-2xl border border-[#F1E3DE] bg-white px-5 py-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs text-[#5B6475] font-semibold", children: "Domestic Pro Fee" }),
              /* @__PURE__ */ jsx("p", { className: "text-xl font-extrabold text-[#EC5F36] mt-0.5", children: "₹5,000" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs text-[#5B6475] font-semibold", children: "Helper Salary" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-[#181C2E] mt-0.5", children: "As mutually agreed" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              setForm((f) => ({ ...f, Budget: "sub-5k" }));
              setTimeout(goNext, 220);
            },
            className: "w-full rounded-2xl py-3.5 text-sm font-bold transition-all duration-200",
            style: {
              background: form.Budget === "sub-5k" ? "linear-gradient(135deg,#EC5F36,#D84E28)" : "#fff",
              border: `2px solid ${form.Budget === "sub-5k" ? "#EC5F36" : "#F1E3DE"}`,
              color: form.Budget === "sub-5k" ? "#fff" : "#EC5F36"
            },
            children: form.Budget === "sub-5k" ? "✓ Understood — Continue" : "I Understand — Proceed"
          }
        )
      ] });
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(QHead, { q: "What's your monthly budget?", hint: "We'll match staff within your budget" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2", children: BUDGETS.map((b) => /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              setF("Budget", b.id);
              after();
            },
            className: "hw2-budget-row",
            style: { background: form.Budget === b.id ? "#EC5F36" : "#fff", borderColor: form.Budget === b.id ? "#EC5F36" : "#E5E2DE" },
            children: [
              /* @__PURE__ */ jsx("span", { className: "hw2-budget-label", style: { color: form.Budget === b.id ? "#fff" : "#1a1a2e" }, children: b.label }),
              /* @__PURE__ */ jsx("span", { className: "hw2-budget-desc", style: { color: form.Budget === b.id ? "rgba(255,255,255,0.8)" : "#888" }, children: b.desc }),
              form.Budget === b.id && /* @__PURE__ */ jsx(Check, { size: 16, strokeWidth: 2.5, color: "#fff", className: "ml-auto flex-shrink-0" })
            ]
          },
          b.id
        )) })
      ] });
    }
    if (curKey === "contact") {
      const phoneOk = form.Phone.length === 10 && /^[6-9]/.test(form.Phone);
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(QHead, { q: "Almost there! 🎉", hint: "Share your details — our team will call you within 2 hours" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2.5 mb-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "hw2-flabel", children: "First Name *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                className: "hw2-finput",
                type: "text",
                placeholder: "Rahul",
                value: form.FirstName,
                onChange: (e) => setF("FirstName", e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "hw2-flabel", children: "Last Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                className: "hw2-finput",
                type: "text",
                placeholder: "Sharma",
                value: form.LastName,
                onChange: (e) => setF("LastName", e.target.value)
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ jsxs("label", { className: "hw2-flabel", children: [
            "Phone * ",
            /* @__PURE__ */ jsx("span", { className: "text-xs font-normal text-gray-400", children: "(we'll call on this)" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "hw2-phone-wrap", style: { borderColor: phoneOk ? "#16a34a" : void 0 }, children: [
            /* @__PURE__ */ jsx("div", { className: "hw2-phone-pre", children: "+91" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "tel",
                inputMode: "numeric",
                maxLength: 10,
                className: "hw2-phone-inp",
                placeholder: "10-digit mobile",
                value: form.Phone,
                autoFocus: true,
                onChange: (e) => setF("Phone", e.target.value.replace(/\D/g, "").slice(0, 10))
              }
            ),
            phoneOk && /* @__PURE__ */ jsx(CheckCircle2, { size: 18, color: "#16a34a", strokeWidth: 2, className: "mr-3 flex-shrink-0" })
          ] }),
          form.Phone.length > 0 && form.Phone.length < 10 && /* @__PURE__ */ jsxs("p", { className: "hw2-warn", children: [
            10 - form.Phone.length,
            " more digit",
            10 - form.Phone.length !== 1 ? "s" : "",
            " needed"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ jsxs("label", { className: "hw2-flabel", children: [
            "Email ",
            /* @__PURE__ */ jsx("span", { className: "text-xs font-normal text-gray-400", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              className: "hw2-finput",
              type: "email",
              placeholder: "rahul@example.com",
              value: form.Email,
              onChange: (e) => setF("Email", e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ jsx("label", { className: "hw2-flabel", children: "Your Area / City *" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                className: "hw2-finput",
                type: "text",
                placeholder: "Street / Area",
                value: form.Street,
                onChange: (e) => setF("Street", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(CitySelect, { value: form.City, onChange: (city) => setF("City", city), placeholder: "Select city" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxs("label", { className: "hw2-flabel", children: [
            "Anything else? ",
            /* @__PURE__ */ jsx("span", { className: "text-xs font-normal text-gray-400", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 2,
              maxLength: 500,
              placeholder: "Specific timing, languages, requirements…",
              value: form.Instructions,
              onChange: (e) => setF("Instructions", e.target.value),
              className: "hw2-textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hw2-summary", children: [
          /* @__PURE__ */ jsx("p", { className: "hw2-sum-head", children: "📋 Your Request Summary" }),
          [
            { k: "Service", v: form.ServiceLabel },
            form.ServiceFormat && { k: "Format", v: SERVICE_FORMATS$2.find((f) => f.id === form.ServiceFormat)?.label },
            form.HouseSize && { k: "Home", v: form.HouseSize.toUpperCase() },
            form.HouseSize && { k: "Household", v: `${form.PeopleAtHome} people` },
            form.Tasks.length > 0 && { k: "Tasks", v: form.Tasks.join(", ") },
            form.MealPref && { k: "Diet", v: form.MealPref },
            form.CuisinePref.length > 0 && { k: "Cuisine", v: form.CuisinePref.join(", ") },
            form.CookMembers && { k: "Family Members", v: form.CookMembers },
            form.HelperGender && { k: "Helper's Gender", v: form.HelperGender },
            form.ChildAge && { k: "Child Age", v: form.ChildAge },
            form.ChildDuties.length > 0 && { k: "Child Duties", v: form.ChildDuties.join(", ") },
            form.JapaDuties?.length > 0 && { k: "Japa Duties", v: form.JapaDuties.join(", ") },
            form.JapaMotherNeeds?.length > 0 && { k: "Mother Needs", v: form.JapaMotherNeeds.join(", ") },
            form.PatientAge && { k: "Patient Age", v: form.PatientAge },
            form.PatientGender && { k: "Patient", v: form.PatientGender },
            form.CareNeeded.length > 0 && { k: "Care Needed", v: form.CareNeeded.join(", ") },
            form.HomeType && { k: "Home Type", v: form.HomeType },
            form.VehicleType.length > 0 && { k: "Vehicle", v: form.VehicleType.join(", ") },
            form.Budget && {
              k: form.ServiceFormat === "Substitute" ? "Service Fee" : "Budget",
              v: form.ServiceFormat === "Substitute" ? "₹5,000 placement fee · salary separate" : BUDGETS.find((b) => b.id === form.Budget)?.label || form.Budget
            },
            form.Urgency && { k: "Urgency", v: URGENCY_OPTIONS$1.find((o) => o.id === form.Urgency)?.label }
          ].filter(Boolean).map(({ k, v }) => /* @__PURE__ */ jsxs("div", { className: "hw2-sum-row", children: [
            /* @__PURE__ */ jsx("span", { className: "hw2-sum-key", children: k }),
            /* @__PURE__ */ jsx("span", { className: "hw2-sum-val capitalize", children: v })
          ] }, k))
        ] })
      ] });
    }
    if (curKey === "plan") {
      const planList = Object.values(PLANS);
      const activePlan = planList.find((p) => p.id === activeTab) || planList[0];
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(QHead, { q: "How do you want to proceed?", hint: "Browse plans and select the one that works for you" }),
        /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 6, marginBottom: 14, background: "#F5F0ED", borderRadius: 12, padding: 4 }, children: planList.map((plan) => {
          const isActive = activePlan.id === plan.id;
          return /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setActiveTab(plan.id),
              style: {
                flex: 1,
                padding: "7px 4px",
                borderRadius: 9,
                border: "none",
                cursor: "pointer",
                transition: "all .2s",
                background: isActive ? "#fff" : "transparent",
                boxShadow: isActive ? "0 1px 6px rgba(0,0,0,0.10)" : "none",
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              },
              children: [
                /* @__PURE__ */ jsx("div", { style: { fontSize: 11, fontWeight: 800, color: isActive ? plan.color : "#9ca3af", lineHeight: 1.2 }, children: plan.name.split(" ")[0] }),
                plan.amount > 0 ? /* @__PURE__ */ jsxs("div", { style: { fontSize: 10, fontWeight: 600, color: isActive ? plan.color : "#bbb", marginTop: 1 }, children: [
                  "₹",
                  plan.amount.toLocaleString()
                ] }) : /* @__PURE__ */ jsx("div", { style: { fontSize: 10, fontWeight: 600, color: isActive ? "#9ca3af" : "#bbb", marginTop: 1 }, children: "Free" })
              ]
            },
            plan.id
          );
        }) }),
        (() => {
          const plan = activePlan;
          const total = plan.amount + plan.gst;
          const isSelected = form.PlanType === plan.id;
          return /* @__PURE__ */ jsxs("div", { style: { border: `2px solid ${isSelected ? plan.color : "#EBEBEB"}`, borderRadius: 16, padding: "14px 15px", background: isSelected ? plan.accentLight : "#fff", transition: "all .22s" }, children: [
            /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 4 }, children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }, children: [
                  /* @__PURE__ */ jsx("div", { style: { width: 8, height: 8, borderRadius: "50%", background: plan.badgeBg, flexShrink: 0 } }),
                  /* @__PURE__ */ jsx("span", { style: { fontSize: 15, fontWeight: 800, color: plan.color, fontFamily: "'Plus Jakarta Sans', sans-serif" }, children: plan.name }),
                  plan.recommended && /* @__PURE__ */ jsx("span", { style: { fontSize: 9, fontWeight: 800, color: "#fff", borderRadius: 20, padding: "2px 8px", background: plan.badgeBg, letterSpacing: ".04em", textTransform: "uppercase" }, children: "Recommended" })
                ] }),
                /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, color: "#9ca3af", fontWeight: 500, marginTop: 3, paddingLeft: 15 }, children: [
                  plan.tag,
                  " · ",
                  plan.subtitle
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { style: { textAlign: "right", flexShrink: 0 }, children: [
                /* @__PURE__ */ jsx("span", { style: { display: "block", fontSize: 22, fontWeight: 800, color: plan.color, fontFamily: "'Fraunces', serif", lineHeight: 1 }, children: plan.amount === 0 ? "Free" : `₹${plan.amount.toLocaleString()}` }),
                plan.amount > 0 && /* @__PURE__ */ jsxs("span", { style: { fontSize: 10, color: "#9ca3af", fontWeight: 500 }, children: [
                  "+ ₹",
                  plan.gst,
                  " GST"
                ] })
              ] })
            ] }),
            plan.amount > 0 && /* @__PURE__ */ jsx("div", { style: { display: "flex", justifyContent: "flex-end", marginBottom: 10 }, children: /* @__PURE__ */ jsxs("span", { style: { fontSize: 10.5, fontWeight: 800, border: `1.5px solid ${plan.borderColor}`, borderRadius: 8, padding: "2px 9px", color: plan.color, background: "rgba(255,255,255,0.7)" }, children: [
              "₹",
              total.toLocaleString(),
              " total"
            ] }) }),
            /* @__PURE__ */ jsx("div", { style: { height: 1, background: isSelected ? plan.borderColor : "#F0F0F0", marginBottom: 12 } }),
            /* @__PURE__ */ jsx("ul", { style: { listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 9 }, children: plan.inclusions.map((item, i) => {
              const IncIcon = ICON_MAP[item.icon] || Check;
              return /* @__PURE__ */ jsxs("li", { style: { display: "flex", alignItems: "flex-start", gap: 10 }, children: [
                /* @__PURE__ */ jsx("span", { style: { width: 27, height: 27, borderRadius: 8, background: isSelected ? "rgba(255,255,255,0.65)" : plan.accentLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }, children: /* @__PURE__ */ jsx(IncIcon, { size: 11, color: plan.color }) }),
                /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 1, flex: 1, minWidth: 0 }, children: [
                  /* @__PURE__ */ jsx("span", { style: { fontSize: 12.5, fontWeight: 700, color: "#1a1a2e", lineHeight: 1.3, fontFamily: "'Plus Jakarta Sans', sans-serif" }, children: item.label }),
                  /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "#6b7280", fontWeight: 500, lineHeight: 1.4 }, children: item.desc })
                ] })
              ] }, i);
            }) }),
            plan.bonus && /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, border: `1.5px solid ${plan.borderColor}`, borderRadius: 10, padding: "7px 12px", fontSize: 12, fontWeight: 700, color: plan.color, background: isSelected ? "rgba(255,255,255,0.55)" : plan.accentLight, marginBottom: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.4 }, children: [
              /* @__PURE__ */ jsx(Gift, { size: 11, color: plan.color, style: { flexShrink: 0 } }),
              /* @__PURE__ */ jsx("span", { children: plan.bonus })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setF("PlanType", plan.id),
                style: { width: "100%", padding: "10px", borderRadius: 11, border: `2px solid ${isSelected ? plan.color : "#E5E2DE"}`, background: isSelected ? plan.badgeBg : "#fff", color: isSelected ? "#fff" : plan.color, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 800, cursor: "pointer", transition: "all .2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 },
                children: isSelected ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(Check, { size: 12 }),
                  " Selected — tap Continue below"
                ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  "Select ",
                  plan.name
                ] })
              }
            )
          ] });
        })(),
        form.PlanType === "Priority" && /* @__PURE__ */ jsx("div", { className: "hw2-pbt-note mt-3 anim-fade-up", style: { background: "#FFF7F4", borderColor: "#F5D8CF", color: "#7C2D12" }, children: /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx(Zap, { size: 12, style: { marginRight: 6, display: "inline" } }),
          /* @__PURE__ */ jsx("strong", { children: "You'll be redirected to a secure Cashfree payment page." }),
          " Profiles shared within ",
          /* @__PURE__ */ jsx("strong", { children: "24 hours" }),
          "."
        ] }) }),
        form.PlanType === "Commitment" && /* @__PURE__ */ jsxs("div", { className: "hw2-pbt-note mt-3 anim-fade-up", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx(CircleCheck, { size: 12, style: { marginRight: 6, display: "inline" } }),
            /* @__PURE__ */ jsxs("strong", { children: [
              "Pay ₹",
              (PLANS.commitment.amount + PLANS.commitment.gst).toLocaleString()
            ] }),
            " now. Profiles within ",
            /* @__PURE__ */ jsx("strong", { children: "3 working days" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("p", { style: { marginTop: 5 }, children: [
            /* @__PURE__ */ jsx(Phone, { size: 12, style: { marginRight: 6, display: "inline" } }),
            "You'll be redirected to a secure Cashfree payment page."
          ] })
        ] }),
        form.PlanType === "No Pay" && /* @__PURE__ */ jsx("div", { className: "hw2-pbt-note mt-3 anim-fade-up", style: { background: "#F9FAFB", borderColor: "#E5E7EB", color: "#6B7280" }, children: /* @__PURE__ */ jsxs("p", { children: [
          "⚠️ Without payment there is ",
          /* @__PURE__ */ jsx("strong", { children: "no priority, no guaranteed timeline, and no replacement support" }),
          "."
        ] }) }),
        submitError && /* @__PURE__ */ jsxs("div", { className: "anim-fade-up", style: { marginTop: 12, padding: "10px 14px", background: "#FEF2F2", border: "1.5px solid #FECACA", borderRadius: 10, color: "#991B1B", fontSize: 12, fontWeight: 600, lineHeight: 1.5 }, children: [
          "⚠ ",
          submitError
        ] })
      ] });
    }
    if (curKey === "done") {
      const isNoPay = form.PlanType === "No Pay";
      const bg = isNoPay ? "linear-gradient(135deg,#9CA3AF,#6B7280)" : "linear-gradient(135deg,#EC5F36,#D84E28)";
      return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-8 text-center", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "anim-spring-pop w-20 h-20 rounded-full flex items-center justify-center mb-5",
            style: { background: bg, boxShadow: "0 10px 36px rgba(0,0,0,.20)" },
            children: /* @__PURE__ */ jsx(Check, { size: 36, color: "#fff", strokeWidth: 3 })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "anim-fade-up", style: { animationDelay: "0.25s" }, children: [
          /* @__PURE__ */ jsx("h3", { className: "hw2-display text-xl font-bold text-gray-900 mb-2", children: "Profiles Sent Successfully ✅" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 max-w-[280px] mx-auto leading-relaxed mb-1", children: "We've shared matching helper profiles on your phone" }),
          /* @__PURE__ */ jsxs("p", { className: "font-bold text-gray-900 text-base mb-1", children: [
            "+91 ",
            form.Phone
          ] }),
          form.Email && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-3", children: form.Email }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-3", children: "Please check your WhatsApp for details" }),
          /* @__PURE__ */ jsx("div", { className: "hw2-done-plan-badge", style: { background: isNoPay ? "#F9FAFB" : "#FFF2EE", color: isNoPay ? "#6B7280" : "#EC5F36", borderColor: isNoPay ? "#E5E7EB" : "#F5D8CF" }, children: isNoPay ? /* @__PURE__ */ jsx(Fragment, { children: "Basic Access — Profiles Shared" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Zap, { size: 12, style: { marginRight: 5, display: "inline" } }),
            "Priority Profiles Delivered"
          ] }) }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] text-gray-400 mt-3", children: "Didn't receive it? Our team may reach out shortly." })
        ] })
      ] });
    }
    return null;
  };
  const renderProgress = () => {
    if (isDone) return null;
    const hideLabels = progKeys.length > 6;
    return /* @__PURE__ */ jsxs("div", { className: "mb-5 flex-shrink-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "hw2-display text-lg font-extrabold text-gray-900 leading-tight", children: "Start Here to Hire Trusted Help Instantly" }),
        form.ServiceType && /* @__PURE__ */ jsxs(
          "span",
          {
            className: "flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full sm-hidden",
            style: { background: "#FFF2EE", color: "#EC5F36", border: "1.5px solid #F5D8CF", fontSize: "0.65rem" },
            children: [
              SERVICES.find((s2) => s2.id === form.ServiceType)?.emoji,
              " ",
              SERVICES.find((s2) => s2.id === form.ServiceType)?.label
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute h-[2px] bg-gray-100 rounded-full",
            style: { top: hideLabels ? 12 : 13, left: `calc(${100 / (2 * progKeys.length)}%)`, right: `calc(${100 / (2 * progKeys.length)}%)`, zIndex: 0 },
            children: /* @__PURE__ */ jsx(
              "div",
              {
                className: "h-full origin-left rounded-full transition-all duration-500 ease-in-out",
                style: { width: `${progPct}%`, background: "linear-gradient(90deg,#EC5F36,#D84E28)" }
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "relative flex justify-between", style: { zIndex: 1 }, children: progKeys.map((key, i) => {
          const meta = PROG_META[key] ?? { label: key, icon: Briefcase };
          const Icon = meta.icon;
          const done = progIdx > i;
          const active = progIdx === i;
          return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1 flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "flex items-center justify-center flex-shrink-0 rounded-full border-2 transition-all duration-300",
                style: {
                  width: hideLabels ? 24 : 28,
                  height: hideLabels ? 24 : 28,
                  background: done ? "#EC5F36" : active ? "#FFF2EE" : "#fff",
                  borderColor: done || active ? "#EC5F36" : "#E5E2DE",
                  boxShadow: active ? "0 0 0 4px rgba(236,95,54,0.15)" : "none",
                  transform: active ? "scale(1.18)" : "scale(1)"
                },
                children: done ? /* @__PURE__ */ jsx(Check, { size: 10, color: "#fff", strokeWidth: 3 }) : /* @__PURE__ */ jsx(Icon, { size: hideLabels ? 10 : 12, color: active ? "#EC5F36" : "#ccc", strokeWidth: 1.8 })
              }
            ),
            !hideLabels && /* @__PURE__ */ jsx(
              "span",
              {
                className: "text-[8px] font-semibold truncate max-w-[36px] text-center leading-none",
                style: { color: active ? "#EC5F36" : done ? "#EC5F36" : "#ccc" },
                children: meta.label
              }
            )
          ] }, `${key}-${i}`);
        }) })
      ] })
    ] });
  };
  const renderFooter = () => {
    if (isDone) return null;
    const showBack = stepIdx > 0;
    const isPlan = curKey === "plan";
    if (!showBack && !showContinue) return null;
    const valid = isValid();
    const planBtnLabel = () => {
      if (!form.PlanType) return "Select a Plan to Continue";
      if (paymentStage === "creating_order") return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Loader2, { size: 13, className: "animate-spin mr-1.5 inline" }),
        "Creating order…"
      ] });
      if (paymentStage === "redirecting") return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Loader2, { size: 13, className: "animate-spin mr-1.5 inline" }),
        "Redirecting to payment…"
      ] });
      if (form.PlanType === "Priority") return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Zap, { size: 13, className: "inline mr-1.5" }),
        "Pay ₹",
        (PLANS.priority.amount + PLANS.priority.gst).toLocaleString(),
        " — Continue"
      ] });
      if (form.PlanType === "Commitment") return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Zap, { size: 13, className: "inline mr-1.5" }),
        "Pay ₹",
        (PLANS.commitment.amount + PLANS.commitment.gst).toLocaleString(),
        " — Continue"
      ] });
      if (form.PlanType === "No Pay") return /* @__PURE__ */ jsx(Fragment, { children: "Continue Without Paying →" });
      return "Select a Plan to Continue";
    };
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: "pt-3 mt-3 flex items-center justify-between gap-3 flex-shrink-0",
        style: { borderTop: "1.5px solid #F0EBE8" },
        children: [
          showBack ? /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              disabled: planSubmitting,
              onClick: goBack,
              className: "flex items-center gap-1.5 text-xs font-bold transition-all duration-150 px-3 py-2.5 rounded-xl flex-shrink-0",
              style: { color: planSubmitting ? "#ccc" : "#5B6475", background: planSubmitting ? "transparent" : "#F5F0ED", border: "1.5px solid #EDE8E4", cursor: planSubmitting ? "not-allowed" : "pointer" },
              children: [
                /* @__PURE__ */ jsx(ArrowLeft, { size: 13, strokeWidth: 2.5 }),
                " Back"
              ]
            }
          ) : /* @__PURE__ */ jsx("div", {}),
          showContinue && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              disabled: !valid || planSubmitting,
              onClick: isPlan ? () => handlePlanSubmit(form.PlanType) : goNext,
              className: "flex items-center justify-center gap-2 text-sm font-bold transition-all duration-200 rounded-xl",
              style: {
                flex: 1,
                maxWidth: showBack ? "68%" : "100%",
                padding: "11px 20px",
                background: !valid || planSubmitting ? "#F0EDE9" : "linear-gradient(135deg,#EC5F36,#D84E28)",
                color: !valid || planSubmitting ? "#C4B8B2" : "#fff",
                cursor: !valid || planSubmitting ? "not-allowed" : "pointer",
                boxShadow: valid && !planSubmitting ? "0 4px 14px rgba(236,95,54,0.35)" : "none",
                border: "none"
              },
              children: isPlan ? planBtnLabel() : curKey === "contact" && true ? planSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Loader2, { size: 13, className: "animate-spin mr-1.5 inline" }),
                "Submitting…"
              ] }) : /* @__PURE__ */ jsx(Fragment, { children: "Submit" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                "Continue",
                /* @__PURE__ */ jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M12 5l7 7-7 7" }) })
              ] })
            }
          )
        ]
      }
    );
  };
  const Shell = /* @__PURE__ */ jsxs("div", { className: "hw2-root flex flex-col bg-white rounded-3xl p-5 sm:p-6 w-full max-w-[35rem]", style: { height: "30rem" }, children: [
    renderProgress(),
    /* @__PURE__ */ jsx("div", { ref: bodyRef, className: "hw2-body overflow-y-auto overflow-x-hidden", style: { flex: 1 }, children: /* @__PURE__ */ jsx(
      "div",
      {
        className: dir > 0 ? curKey == "contact" ? "" : "step-enter-right" : "step-enter-left",
        children: renderStep()
      },
      `${form.ServiceType || "svc"}-${stepIdx}`
    ) }),
    renderFooter()
  ] });
  if (asModal) {
    if (!isOpen) return null;
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4",
        onClick: (e) => {
          if (e.target === e.currentTarget) {
            resetWizard();
            onClose?.();
          }
        },
        children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-xl anim-status-enter", children: [
          onClose && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              "aria-label": "Close",
              onClick: () => {
                resetWizard();
                onClose?.();
              },
              className: "absolute -top-3 -right-3 bg-white shadow-md rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-50 transition",
              style: { border: "1.5px solid #F0EBE8" },
              children: /* @__PURE__ */ jsx(X, { size: 17, strokeWidth: 2.5 })
            }
          ),
          Shell
        ] })
      }
    );
  }
  return Shell;
}
const CSS$1 = `
  .plan-card-hover { transition: box-shadow 0.3s ease, transform 0.3s ease; }
  .plan-card-hover:hover { box-shadow: 0 16px 48px rgba(236,95,54,0.12); transform: translateY(-3px); }
  .plan-highlighted { box-shadow: 0 20px 60px rgba(236,95,54,0.20); }
  .badge-gradient { background: linear-gradient(135deg, #EC5F36 0%, #D84E28 100%); }
  .cta-shimmer::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 60%);
    opacity: 0; transition: opacity 0.2s;
    border-radius: inherit;
  }
  .cta-shimmer:hover::before { opacity: 1; }
`;
const plans = [
  {
    name: "Connect",
    price: 11e3,
    gstPrice: 12980,
    tagline: "Structured support to help you hire verified domestic help.",
    profiles: "5 verified profiles",
    icon: Zap,
    badge: "🚀 Most Popular & Quickest",
    features: [
      "Requirement understanding (role, hours, expectations)",
      "ID & address verification",
      "3-day trial period",
      "5-day free lookup period",
      "Profile finalization assistance (Audio/Video interview)",
      "One-time placement support"
    ],
    highlighted: false
  },
  {
    name: "Care",
    price: 15e3,
    gstPrice: 17700,
    tagline: "Enhanced verification and screening for added confidence.",
    profiles: "7 verified profiles",
    icon: Shield,
    features: [
      "Includes everything in Connect",
      "10-day trial period",
      "5-day free lookup period",
      "1 Replacement in 11 months",
      "Police verification",
      "Enhanced screening review"
    ],
    highlighted: false
  },
  {
    name: "Complete",
    price: 2e4,
    gstPrice: 23600,
    tagline: "End-to-end protection with priority support.",
    profiles: "10 verified profiles",
    icon: Star,
    features: [
      "Includes everything in Care",
      "15-day trial period",
      "10-day free lookup period",
      "2 Replacement in 11 months",
      "Priority matching",
      "Detailed background & reference verification",
      "Ongoing support & mediation",
      "Periodic check-ins (30 / 60 days)",
      "Role upgrade support (within plan validity)"
    ],
    highlighted: true
  }
];
function PricingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const sections = document.querySelectorAll(".scroll-section");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("show")),
      { threshold: 0.15 }
    );
    sections.forEach((s2) => observer.observe(s2));
    return () => sections.forEach((s2) => observer.unobserve(s2));
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("style", { children: CSS$1 }),
    /* @__PURE__ */ jsxs("section", { className: "bg-bgLight py-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6 text-center mb-14", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-block bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6", children: "Transparent Pricing" }),
        /* @__PURE__ */ jsxs("h2", { className: "text-5xl md:text-6xl font-bold text-textDark leading-tight mb-5", children: [
          "Simple plans for",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("em", { className: "text-primary not-italic", children: "every household." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight text-lg max-w-xl mx-auto leading-relaxed", children: "No hidden charges. Structured hiring. Verified professionals — choose the level of care that fits your home." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 scroll-section", children: [
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6 lg:gap-8 items-center", children: plans.map((plan) => {
          const Icon = plan.icon;
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: `relative bg-white rounded-3xl p-8 flex flex-col
                    ${plan.highlighted ? "border-2 border-primary plan-highlighted md:-translate-y-5" : "border border-borderLight plan-card-hover"}`,
              style: { minHeight: 680 },
              children: [
                plan.highlighted && /* @__PURE__ */ jsx("div", { className: "badge-gradient absolute -top-4 left-1/2 -translate-x-1/2 text-white text-xs font-bold tracking-widest px-5 py-1.5 rounded-full uppercase whitespace-nowrap shadow-[0_4px_14px_rgba(236,95,54,0.40)]", children: "⭐ Recommended" }),
                plan.badge && !plan.highlighted && /* @__PURE__ */ jsx("div", { className: "badge-gradient absolute -top-4 left-1/2 -translate-x-1/2 text-white text-xs font-bold tracking-widest px-5 py-1.5 rounded-full uppercase whitespace-nowrap shadow-[0_4px_14px_rgba(236,95,54,0.40)]", children: plan.badge }),
                /* @__PURE__ */ jsx("div", { className: `w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${plan.highlighted ? "bg-primary/10" : "bg-bgLight"}`, children: /* @__PURE__ */ jsx(Icon, { size: 20, className: "text-primary" }) }),
                /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-bold text-textDark mb-1", children: [
                  "Domestic Pro –",
                  " ",
                  /* @__PURE__ */ jsx("span", { className: plan.highlighted ? "text-primary" : "", children: plan.name })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-textLight leading-relaxed mb-6", children: plan.tagline }),
                /* @__PURE__ */ jsx("div", { className: `rounded-2xl px-5 py-4 mb-6 ${plan.highlighted ? "bg-primary/5 border border-primary/10" : "bg-bgLight"}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-1", children: [
                  /* @__PURE__ */ jsxs("span", { className: "text-4xl font-bold text-textDark", children: [
                    "₹",
                    plan.price.toLocaleString()
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-textLight mb-1", children: "+ GST" })
                ] }) }),
                /* @__PURE__ */ jsx("div", { className: "border-t border-borderLight mb-5" }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-primary flex-shrink-0" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-primary", children: plan.profiles })
                ] }),
                /* @__PURE__ */ jsx("ul", { className: "flex-1 space-y-3 mb-8", children: plan.features.map((feature, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-sm text-textLight leading-snug", children: [
                  /* @__PURE__ */ jsx("span", { className: `w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.highlighted ? "bg-primary/10" : "bg-bgLight"}`, children: /* @__PURE__ */ jsx(Check, { size: 12, className: "text-primary", strokeWidth: 3 }) }),
                  feature
                ] }, i)) }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => setIsModalOpen(true),
                    className: `cta-shimmer relative overflow-hidden w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200
                      ${plan.highlighted ? "bg-primary hover:bg-primaryHover text-white shadow-[0_4px_14px_rgba(236,95,54,0.30)] hover:shadow-[0_6px_20px_rgba(236,95,54,0.40)] hover:-translate-y-0.5" : "bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white"}`,
                    children: [
                      "Choose ",
                      plan.name,
                      " →"
                    ]
                  }
                )
              ]
            },
            plan.name
          );
        }) }),
        /* @__PURE__ */ jsx("div", { className: "mt-16 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex flex-wrap items-center justify-center gap-3 bg-white border border-borderLight rounded-full px-8 py-4 text-sm text-textLight shadow-sm", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("strong", { className: "text-textDark", children: "Connect" }),
            " → We help you find"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-borderLight text-lg", children: "•" }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("strong", { className: "text-textDark", children: "Care" }),
            " → We help you settle"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-borderLight text-lg", children: "•" }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("strong", { className: "text-textDark", children: "Complete" }),
            " → We help you stay stress-free"
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(HeroWizard, { asModal: true, isOpen: isModalOpen, onClose: () => setIsModalOpen(false) })
  ] });
}
const steps = [
  {
    number: "01",
    title: "Plan Selection",
    description: "Choose Connect, Care, or Complete based on the level of verification and support you prefer.",
    image: "https://res.cloudinary.com/dto7bji6b/image/upload/f_auto,w_100/v1774335046/d8d65fe2-617e-45c9-900b-93e7bc9be92c_spy8bn.webp"
  },
  {
    number: "02",
    title: "Profile Sharing & Interviews",
    description: "Verified profiles are shared as per your selected plan. Interviews are coordinated accordingly.",
    image: "https://res.cloudinary.com/dto7bji6b/image/upload/f_auto,w_150/v1774335643/Virtual_interview_in_progress_jdzrjv.webp"
  },
  {
    number: "03",
    title: "Candidate Confirmation",
    description: "You finalize the most suitable candidate after review and discussion.",
    image: "https://res.cloudinary.com/dto7bji6b/image/upload/f_auto,w_100/v1774336700/Successful_candidate_confirmation_moment_xpidww.webp"
  },
  {
    number: "04",
    title: "Joining & Structured Support",
    description: "Post-joining assistance and follow-up support are provided as per your selected plan.",
    image: "https://res.cloudinary.com/dto7bji6b/image/upload/f_auto,w_100/v1774336141/Professional_handshake_with_friendly_exchange_ivn6qz.webp"
  }
];
const CSS = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes lineGrow {
    from { width: 0%; }
    to   { width: 100%; }
  }
  .hiw-card {
    opacity: 0;
    transform: translateY(28px);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  }
  .hiw-card:hover {
    box-shadow: 0 20px 48px rgba(236,95,54,0.13);
    transform: translateY(-4px) !important;
  }
  .hiw-section.show .hiw-card {
    animation: fadeUp 0.55s ease forwards;
  }
  .hiw-section.show .hiw-card:nth-child(1) { animation-delay: 0.05s; }
  .hiw-section.show .hiw-card:nth-child(2) { animation-delay: 0.17s; }
  .hiw-section.show .hiw-card:nth-child(3) { animation-delay: 0.29s; }
  .hiw-section.show .hiw-card:nth-child(4) { animation-delay: 0.41s; }
  .hiw-section.show .hiw-line {
    animation: lineGrow 0.9s ease 0.1s forwards;
  }
  .hiw-line { width: 0%; }

  .hiw-icon-ring {
    transition: all 0.2s ease;
  }

  /* Updated hover for images */
  .hiw-card:hover .hiw-icon-ring {
    background: rgba(236,95,54,0.12);
    transform: scale(1.05);
  }
`;
function HowItWorks() {
  const sectionRef = useRef(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("show");
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("style", { children: CSS }),
    /* @__PURE__ */ jsx("section", { className: "bg-white py-24 px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-block bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5", children: "Our Process" }),
        /* @__PURE__ */ jsx("h3", { className: "text-4xl md:text-5xl font-bold text-textDark mb-4", children: "How the Process Works" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight text-lg max-w-2xl mx-auto leading-relaxed", children: "A structured and transparent hiring journey designed for clarity and confidence." })
      ] }),
      /* @__PURE__ */ jsxs("div", { ref: sectionRef, className: "hiw-section", children: [
        /* @__PURE__ */ jsxs("div", { className: "hidden md:block relative mb-0 mx-4", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 h-0.5 bg-borderLight w-full" }),
          /* @__PURE__ */ jsx("div", { className: "hiw-line absolute top-0 left-0 h-0.5 bg-primary" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col md:flex-row items-stretch pt-8 gap-6", children: steps.map((step, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-stretch flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "hiw-card flex-1 min-w-0 bg-white border border-borderLight rounded-2xl p-5 flex flex-col gap-3 h-full", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("div", { className: "hiw-icon-ring w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: step.image,
                  alt: step.title,
                  width: 56,
                  height: 56,
                  className: "w-14 h-14 object-cover"
                }
              ) }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "text-2xl font-black leading-none select-none text-primary !important",
                  style: { opacity: 1 },
                  children: step.number
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-px bg-borderLight" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-textDark mb-1.5 leading-snug", children: step.title }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-textLight leading-relaxed", children: step.description })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-auto pt-1 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-primary/40" }),
              /* @__PURE__ */ jsx("span", { className: "w-8 h-0.5 bg-primary/20 rounded-full" })
            ] })
          ] }),
          i < steps.length - 1 && /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center justify-center flex-shrink-0 w-8", children: /* @__PURE__ */ jsxs("svg", { width: "28", height: "20", viewBox: "0 0 28 20", fill: "none", children: [
            /* @__PURE__ */ jsx("line", { x1: "0", y1: "10", x2: "18", y2: "10", stroke: "#EC5F36", strokeWidth: "1.6", strokeDasharray: "3 2.5" }),
            /* @__PURE__ */ jsx("path", { d: "M15 4L23 10L15 16", stroke: "#EC5F36", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" })
          ] }) })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 bg-bgLight border border-borderLight rounded-2xl px-6 py-4 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-textLight leading-relaxed", children: [
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-textDark", children: "Note: " }),
        "Advance payment is adjustable in the final plan amount. Full transparency is maintained at every stage of the hiring process."
      ] }) })
    ] }) })
  ] });
}
function MatchedProfilesPreview() {
  const pages = [
    "https://res.cloudinary.com/dto7bji6b/image/upload/v1774503597/1st_page_u48hs0.jpg",
    "https://res.cloudinary.com/dto7bji6b/image/upload/v1774503611/2nd_page_abqjbh.jpg",
    "https://res.cloudinary.com/dto7bji6b/image/upload/v1774503931/3rd_page_a296lt.jpg",
    "https://res.cloudinary.com/dto7bji6b/image/upload/v1774503939/4th_page_qqg1q5.jpg"
  ];
  return /* @__PURE__ */ jsx("section", { className: "bg-bgLight border-y border-borderLight", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6 py-20 scroll-section", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-textDark mb-3", children: "See What You'll Receive on WhatsApp" }),
      /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto", children: "Once you register, we send you a personalized list of matched profiles based on your exact requirements — instantly on WhatsApp." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white border border-borderLight rounded-2xl shadow-md overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 py-2.5 bg-[#f5f2ee] border-b border-borderLight", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5", children: [
          /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-[#f0a89a] inline-block" }),
          /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-[#f0d48a] inline-block" }),
          /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-[#a8d8a8] inline-block" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-textLight tracking-wide", children: "matched_profiles_sample.pdf" }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-textLight", children: "4 pages" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "p-4 md:p-6 pb-0", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: [
            "h-[500px] md:h-[600px] overflow-y-scroll rounded-xl",
            "bg-[#e8e5e0] p-4 flex flex-col gap-3",
            // Thin orange scrollbar (Webkit)
            "[&::-webkit-scrollbar]:w-[5px]",
            "[&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#f5f0eb]",
            "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#e87c2f]",
            "[&::-webkit-scrollbar-thumb:hover]:bg-[#d06520]"
          ].join(" "),
          style: { scrollbarWidth: "thin", scrollbarColor: "#e87c2f #f5f0eb" },
          children: pages.map((src, i) => /* @__PURE__ */ jsx(
            "img",
            {
              src,
              alt: `PDF Page ${i + 1}`,
              width: 600,
              height: 850,
              className: "w-full rounded-[3px] shadow-md",
              style: { aspectRatio: "600/850" }
            },
            i
          ))
        }
      ) }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-textLight py-4", children: "📄 Sample preview — actual profiles are personalized for you" })
    ] })
  ] }) });
}
const DEFAULT_DESCRIPTION = "Hire verified, background-checked live-in maids, baby caretakers, cooks, patient care & japa helpers across Delhi NCR. Domestic Pro — trusted by 1000+ families.";
const DEFAULT_IMAGE = "https://domesticpro.in/updatedLogo.png";
function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_IMAGE,
  noIndex = false,
  schema
}) {
  const fullTitle = title ? `${title} | DomesticPro` : "DomesticPro — Verified 24×7 Live-In Domestic Helpers";
  const fullDescription = description || DEFAULT_DESCRIPTION;
  const fullCanonical = canonical ? `https://domesticpro.in${canonical}` : void 0;
  const schemas = schema ? Array.isArray(schema) ? schema : [schema] : [];
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("title", { children: fullTitle }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: fullDescription }),
    /* @__PURE__ */ jsx(
      "meta",
      {
        name: "robots",
        content: noIndex ? "noindex, nofollow" : "index, follow"
      }
    ),
    fullCanonical && /* @__PURE__ */ jsx("link", { rel: "canonical", href: fullCanonical }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: "DomesticPro" }),
    /* @__PURE__ */ jsx("meta", { property: "og:locale", content: "en_IN" }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: fullTitle }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: fullDescription }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: ogImage }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: "1200" }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: "630" }),
    fullCanonical && /* @__PURE__ */ jsx("meta", { property: "og:url", content: fullCanonical }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: fullTitle }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: fullDescription }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: ogImage }),
    schemas.map((s2, i) => /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(s2) }, i))
  ] });
}
function useScrollReveal() {
  useEffect(() => {
    const sections = document.querySelectorAll(".scroll-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.15 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);
}
const TestimonialsSection = lazy(() => import("./assets/TestimonialCarousel-B8nI6hy-.js"));
const WHY_CARDS = [
  {
    image: "https://res.cloudinary.com/dto7bji6b/image/upload/f_auto,w_100/v1774330222/unnamed_jn88vo.jpg",
    // save your image here
    title: "Verified Staff",
    desc: "Every candidate undergoes strict background verification for your safety."
  },
  {
    image: "https://res.cloudinary.com/dto7bji6b/image/upload/f_auto,w_100/v1774330704/clock_qplc39.webp",
    title: "Fast Hiring",
    desc: "Get suitable staff within 24–48 hours based on your requirements."
  },
  {
    image: "https://res.cloudinary.com/dto7bji6b/image/upload/f_auto,w_100/v1774330769/New_housemaid_transition_in_home_setting_rdss8s.webp",
    title: "Substitute Guarantee",
    desc: "Replacement staff provided instantly if your regular staff is unavailable."
  },
  {
    image: "https://res.cloudinary.com/dto7bji6b/image/upload/f_auto,w_100/v1774330874/ChatGPT_Image_Mar_24_2026_11_10_46_AM_hwbydu.webp",
    title: "Dedicated Support",
    desc: "Our team assists you throughout hiring and after placement."
  }
];
const faqs = [
  { q: "Why should I hire through Domestic Pro instead of searching independently?", a: "Domestic Pro saves you time and uncertainty by shortlisting candidates that match your exact requirement. Instead of speaking with dozens of unsuitable profiles, you receive relevant candidates who are actively looking for work and ready to interview." },
  { q: "How soon can I receive profiles?", a: "Once the registration or commitment process is completed, Domestic Pro begins shortlisting immediately. Depending on the plan selected, clients typically receive profiles within 24 hours to 3–5 working days." },
  { q: "Can I speak to the candidate before finalizing?", a: "Yes. Clients can interview candidates over the phone or in person before making a decision. Many families also prefer arranging a trial day to ensure the candidate fits their household requirements." },
  { q: "What if the candidate does not work out?", a: "Domestic Pro provides replacement assistance within the replacement window mentioned in the selected plan, helping ensure clients eventually find a suitable match." },
  { q: "What kind of domestic staff can Domestic Pro help with?", a: "We assist with placements for Nannies / Babysitters, Female Cooks, All-Rounders (Cleaning + Kitchen support), Housekeepers, and 24-hour Live-in Staff." },
  { q: "How is the salary decided?", a: "Salary depends on experience, skills, working hours, and job responsibilities. Domestic Pro helps guide both sides toward a fair and market-appropriate salary range." },
  { q: "Why is a commitment or registration fee required?", a: "The commitment fee ensures that Domestic Pro dedicates resources to actively search, screen, and coordinate candidates for serious clients. It also helps prioritize your requirement and avoid unnecessary delays." },
  { q: "Is Domestic Pro responsible for the worker after placement?", a: "Domestic Pro acts as a placement service connecting clients with domestic workers. The employment relationship is directly between the client and the worker." },
  { q: "Can I hire a candidate immediately if I like them?", a: "Yes. Once both parties agree on salary, duties, and joining date, the placement can be finalized immediately and the candidate can join as mutually decided." },
  { q: "What is the first step to start the hiring process?", a: "Simply share your requirement with our team and complete the registration or commitment process. Our team will then begin shortlisting suitable candidates and coordinating interviews." }
];
function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [openIndexes, setOpenIndexes] = useState([]);
  const toggleFAQ = (i) => setOpenIndexes((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);
  useScrollReveal();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Hire Verified Live-In Domestic Helpers",
        description: "DomesticPro connects families with verified, trained domestic helpers — nannies, cooks, drivers, and patient care. Fast hiring in Delhi-NCR, Mumbai, Bangalore.",
        canonical: "/",
        ogImage: "https://domesticpro.in/hero-image.webp"
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "bg-bgLight", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "relative w-full h-[32vh] sm:h-[19vh] md:h-[39vh] lg:h-[38rem]",
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "/hero-image.webp",
                alt: "Domestic Pro — Verified House Help",
                loading: "eager",
                fetchPriority: "high",
                decoding: "async",
                width: 1440,
                height: 608,
                className: "absolute inset-0 w-full h-full object-center object-cover"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "absolute lg:w-1/2 md:w-full top-0 lg:px-[4rem] px-4 pt-[3rem] pb-[2rem]", children: [
              /* @__PURE__ */ jsx("div", { className: "pt-4 hidden lg:block", children: /* @__PURE__ */ jsx(HeroWizard, {}) }),
              /* @__PURE__ */ jsxs("h1", { className: "text-white text-3xl sm:text-4xl lg:hidden font-bold leading-tight mb-4", children: [
                "Hire Verified",
                /* @__PURE__ */ jsx("span", { className: "text-primary", children: " Domestic Professionals " }),
                "instantly"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-white text-sm sm:text-base lg:hidden opacity-90", children: "Verified nanny, househelp, cooks and drivers. Fast hiring. Trusted professionals." })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "w-full md:flex justify-center hidden lg:hidden", children: /* @__PURE__ */ jsx(HeroWizard, {}) }),
      /* @__PURE__ */ jsx("div", { className: "w-full mx-2 lg:hidden md:hidden", children: /* @__PURE__ */ jsx(HeroWizard, {}) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-white border-y border-borderLight", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 py-20 scroll-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-textDark mb-3", children: "Why Choose Domestic Pro" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto", children: "We provide reliable, verified, and professional household staff with a seamless hiring experience." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6", children: WHY_CARDS.map(({ image, title, desc }) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-bgLight border border-borderLight rounded-2xl p-6 text-center hover:border-primary hover:shadow-[0_8px_32px_rgba(236,95,54,0.10)] transition-all duration-300 group",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-2 border-borderLight group-hover:border-primary transition-colors duration-300", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: image,
                alt: title,
                className: "w-full h-full object-cover"
              }
            ) }),
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-textDark text-base mb-2", children: title }),
            /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm leading-relaxed", children: desc })
          ]
        },
        title
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-14 bg-bgLight border border-borderLight rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-textDark mb-1", children: "Trusted by Families Across the City" }),
          /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Reliable hiring platform for nanny, househelp, cooks, and drivers." })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setIsModalOpen(true),
            className: "bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 shadow-[0_4px_14px_rgba(236,95,54,0.30)] hover:shadow-[0_6px_20px_rgba(236,95,54,0.40)] hover:-translate-y-0.5 whitespace-nowrap flex items-center gap-2",
            children: [
              "Hire Now   ",
              /* @__PURE__ */ jsx("svg", { width: 15, height: 15, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M12 5l7 7-7 7" }) })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(PricingSection, {}),
    /* @__PURE__ */ jsx(HowItWorks, {}),
    /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "h-64 bg-bgLight animate-pulse rounded-2xl" }), children: /* @__PURE__ */ jsx(TestimonialsSection, {}) }),
    /* @__PURE__ */ jsx(MatchedProfilesPreview, {}),
    /* @__PURE__ */ jsx("section", { className: "bg-bgLight py-24", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-block bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5", children: "Got Questions?" }),
        /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-textDark", children: "Frequently Asked Questions" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: faqs.map((faq, i) => {
        const isOpen = openIndexes.includes(i);
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: `faq-card bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "border-primary shadow-[0_4px_20px_rgba(236,95,54,0.10)]" : "border-borderLight"}`,
            children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => toggleFAQ(i),
                  className: "w-full flex items-center justify-between p-6 text-left",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
                      /* @__PURE__ */ jsx("span", { className: `w-7 h-7 flex-shrink-0 rounded-lg flex items-center justify-center mt-0.5 transition-colors duration-200 ${isOpen ? "bg-primary" : "bg-primary/10"}`, children: /* @__PURE__ */ jsx("span", { className: `font-bold text-xs ${isOpen ? "text-white" : "text-primary"}`, children: "Q" }) }),
                      /* @__PURE__ */ jsx("h3", { className: "font-bold text-textDark leading-snug text-sm md:text-base", children: faq.q })
                    ] }),
                    /* @__PURE__ */ jsx(ChevronDown, { size: 20, className: `transition-transform duration-300 text-primary flex-shrink-0 ml-4 ${isOpen ? "rotate-180" : ""}` })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: `transition-all duration-400 ease-in-out overflow-hidden ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`, children: /* @__PURE__ */ jsx("div", { className: "px-6 pb-6 pl-[3.25rem]", children: /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm leading-relaxed", children: faq.a }) }) })
            ]
          },
          i
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { style: { background: "linear-gradient(135deg, #EC5F36 0%, #C94520 100%)" }, children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 py-16 text-center text-white scroll-section", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 leading-tight", children: "Ready to Hire Trusted Help?" }),
      /* @__PURE__ */ jsx("p", { className: "mb-8 text-white/85 text-lg", children: "Get verified professionals within 24 hours" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => navigate("/contact"),
          className: "bg-white text-primary px-8 py-3.5 rounded-xl font-bold hover:bg-bgLight transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 text-sm",
          children: "Contact Now →"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "mt-12 flex flex-wrap items-center justify-center gap-8 text-white/70 text-sm", children: ["Verified Professionals", "Police-Checked Staff", "Dedicated Support", "Replacement Guaranteed"].map((t) => /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Check, { size: 13, className: "text-white/60", strokeWidth: 3 }),
        t
      ] }, t)) })
    ] }) }),
    /* @__PURE__ */ jsx(HeroWizard, { asModal: true, isOpen: isModalOpen, onClose: () => setIsModalOpen(false) })
  ] });
}
const API_BASE$3 = "http://localhost:8000";
const scList = [
  { id: "SC-01", name: "Pallavi", email: "pallavi.domesticpro@gmail.com", phone: "9211298139" }
];
const SERVICE_TYPES$1 = [
  "Live-In Support",
  "Cooking Help",
  "Baby Caretaker",
  "Patient Care",
  "Driver",
  "Japa"
];
const SERVICE_FORMATS$1 = ["Live-In", "Substitute"];
const GENDER_OPTIONS$1 = ["Male", "Female", "Other"];
const MARITAL_OPTIONS = ["Yes", "No"];
const STATUS_OPTIONS = ["Active", "Inactive", "Will be Available Soon"];
const PIPELINE_STAGE_DEFAULT = "Profile Created";
const AVAILABILITY_OPTIONS = ["Immediately", "Within 15-20 days", "Within 30 days"];
const TASK_OPTIONS$1 = ["Cleaning", "Utensils", "Laundry", "Dusting", "Bathroom", "Groceries", "Other"];
const HOUSE_SIZE_OPTIONS$1 = ["1BHK", "2BHK", "3BHK", "4BHK", "Villa"];
const MEAL_PREF_OPTIONS$1 = ["Veg", "Non- Veg", "Both"];
const CUISINE_OPTIONS$1 = ["North Indian", "South Indian", "Chinese", "Continental", "Diet Food", "Other"];
const CHILD_AGE_OPTIONS$1 = ["0 - 1 Year", "2 - 5 Years", "6 - 12 Years", "13+ Years"];
const CHILD_DUTY_OPTIONS$1 = ["Feeding", "Bathing", "Homework", "Playtime", "Putting to sleep", "Other"];
const CARE_NEEDED_OPTIONS$1 = ["Basic Support", "Personal Hygiene", "Mobility Support", "Medicine Reminders", "Full Care"];
const PATIENT_GENDER_OPTIONS$1 = ["Male", "Female", "Other"];
const VEHICLE_TYPE_OPTIONS$1 = ["Manual", "Automatic", "SUV", "Sedan"];
const DRIVING_LICENSE_OPTIONS = ["Yes", "No"];
const JAPA_DUTY_OPTIONS$1 = ["Newborn Bath", "Feeding Support", "Swaddling", "Night Watch", "Other"];
const JAPA_MOTHER_OPTIONS$1 = ["Body Massage", "Diet & Nutrition", "Light Cooking", "Night Support", "Personal Hygiene", "Other"];
const INIT$2 = {
  FullName: "",
  Phone: "",
  Gender: "",
  Age: "",
  MaritalStatus: "",
  Street: "",
  CurrentCity: "",
  State: "",
  NativeCity: "",
  PreferredWorkAreas: "",
  PrefCity: "",
  PrefState: "",
  Status: "",
  ServiceType: "",
  ServiceFormat: "",
  Email: "",
  ReferredBy: "",
  SCAssigned: "",
  AvailableFrom: "",
  Availability: "",
  SalaryExpectation: "",
  YearsOfExperience: "",
  Instructions: "",
  Photograph: null,
  AadharCard: null,
  AadharCardBack: null,
  // service-type fields
  Tasks: [],
  HouseSize: "",
  PeopleAtHome: "",
  PetsAtHome: "",
  ComfortablePets: "",
  MealPref: "",
  CuisinePref: [],
  ComfortableFamilySize: "",
  ChildAge: "",
  ChildDuties: [],
  PatientAge: "",
  PatientGender: "",
  CareNeeded: [],
  VehicleType: [],
  DrivingLicense: "",
  JapaDuties: [],
  JapaMotherNeeds: []
};
const s$2 = {
  page: { minHeight: "100vh", background: "#F5F5F5", padding: "24px 16px 48px", fontFamily: "'Segoe UI', Arial, sans-serif" },
  card: { maxWidth: "50rem", margin: "0 auto", background: "#fff", borderRadius: 4, border: "1px solid #ddd", overflow: "hidden" },
  header: { display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", borderBottom: "2px solid #EC5F36", background: "#fff" },
  logoBox: { width: "6.5rem", height: 64, background: "#ffffff", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  headerTitle: { fontSize: 20, fontWeight: 700, color: "#111", lineHeight: 1.3, margin: 0 },
  headerSub: { fontSize: 12, color: "#777", marginTop: 3 },
  body: { padding: "0 24px 24px" },
  sectionBar: { background: "#f9f9f9", borderLeft: "3px solid #EC5F36", padding: "7px 12px", margin: "24px -24px 18px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#EC5F36" },
  field: { marginBottom: 14 },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 5 },
  req: { color: "#EC5F36", marginLeft: 2 },
  input: { width: "100%", border: "1px solid #ccc", borderRadius: 3, padding: "7px 10px", fontSize: 14, color: "#111", background: "#fff", outline: "none", boxSizing: "border-box", fontFamily: "inherit" },
  select: { width: "100%", border: "1px solid #ccc", borderRadius: 3, padding: "7px 10px", fontSize: 14, color: "#111", background: "#fff", outline: "none", boxSizing: "border-box", appearance: "none", cursor: "pointer", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", fontFamily: "inherit" },
  textarea: { width: "100%", border: "1px solid #ccc", borderRadius: 3, padding: "7px 10px", fontSize: 14, color: "#111", background: "#fff", outline: "none", resize: "vertical", minHeight: 80, boxSizing: "border-box", fontFamily: "inherit" },
  radioRow: { display: "flex", flexDirection: "column", gap: 7, marginTop: 2 },
  radioRowH: { display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "7px 20px", marginTop: 2 },
  radioLabel: { display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#222", cursor: "pointer", fontWeight: 400 },
  radioInput: { width: 15, height: 15, accentColor: "#EC5F36", cursor: "pointer", margin: 0 },
  checkLabel: { display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#222", cursor: "pointer", fontWeight: 400 },
  checkInput: { width: 14, height: 14, accentColor: "#EC5F36", cursor: "pointer", margin: 0 },
  row2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
  phoneWrap: { display: "flex" },
  phonePrefix: { background: "#f4f4f4", border: "1px solid #ccc", borderRight: "none", borderRadius: "3px 0 0 3px", padding: "7px 10px", fontSize: 14, color: "#555", whiteSpace: "nowrap", display: "flex", alignItems: "center" },
  phoneInput: { flex: 1, border: "1px solid #ccc", borderRadius: "0 3px 3px 0", padding: "7px 10px", fontSize: 14, color: "#111", background: "#fff", outline: "none", fontFamily: "inherit" },
  errText: { fontSize: 11, color: "#c00", marginTop: 3, display: "block" },
  submitBtn: { width: "100%", padding: "11px", background: "#EC5F36", color: "#fff", border: "none", borderRadius: 3, fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 24, letterSpacing: "0.01em" },
  submitBtnDisabled: { width: "100%", padding: "11px", background: "#ddd", color: "#999", border: "none", borderRadius: 3, fontSize: 15, fontWeight: 700, cursor: "not-allowed", marginTop: 24 },
  successBanner: { background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 3, padding: "12px 14px", fontSize: 13, color: "#166534", fontWeight: 600, marginTop: 14 },
  errorBanner: { background: "#fff5f5", border: "1px solid #fecaca", borderRadius: 3, padding: "12px 14px", fontSize: 13, color: "#991b1b", fontWeight: 600, marginTop: 14 },
  // Photo upload styles
  photoUploadBox: { border: "1.5px dashed #ccc", borderRadius: 4, padding: "14px 12px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", background: "#fafafa", transition: "border-color 0.2s" },
  photoUploadBoxActive: { borderColor: "#EC5F36", background: "#fdf6f3" },
  photoPreview: { width: 54, height: 54, objectFit: "cover", borderRadius: 3, border: "1px solid #ddd", flexShrink: 0 },
  photoPlaceholder: { width: 54, height: 54, background: "#f0f0f0", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  photoText: { fontSize: 13, color: "#555" },
  photoChange: { fontSize: 11, color: "#EC5F36", marginTop: 2 }
};
const SectionBar$1 = ({ children }) => /* @__PURE__ */ jsx("div", { style: s$2.sectionBar, children });
const Err$1 = ({ msg }) => msg ? /* @__PURE__ */ jsx("span", { style: s$2.errText, children: msg }) : null;
const CheckboxGroup$1 = ({ label, required, values, onChange, options, horizontal }) => /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
  /* @__PURE__ */ jsxs("label", { style: s$2.label, children: [
    label,
    required && /* @__PURE__ */ jsx("span", { style: s$2.req, children: "*" })
  ] }),
  /* @__PURE__ */ jsx("div", { style: horizontal ? s$2.radioRowH : s$2.radioRow, children: options.map((o) => /* @__PURE__ */ jsxs("label", { style: s$2.checkLabel, children: [
    /* @__PURE__ */ jsx("input", { type: "checkbox", style: s$2.checkInput, checked: values.includes(o), onChange: () => onChange(o) }),
    o
  ] }, o)) })
] });
const PhotoUpload = ({ label, required, value, onChange, fieldKey }) => {
  const inputRef = useRef();
  const [hover, setHover] = useState(false);
  const preview = value ? URL.createObjectURL(value) : null;
  return /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
    /* @__PURE__ */ jsxs("label", { style: s$2.label, children: [
      label,
      required && /* @__PURE__ */ jsx("span", { style: s$2.req, children: "*" })
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        style: { ...s$2.photoUploadBox, ...hover ? s$2.photoUploadBoxActive : {} },
        onClick: () => inputRef.current.click(),
        onMouseEnter: () => setHover(true),
        onMouseLeave: () => setHover(false),
        children: [
          preview ? /* @__PURE__ */ jsx("img", { src: preview, alt: "preview", style: s$2.photoPreview }) : /* @__PURE__ */ jsx("div", { style: s$2.photoPlaceholder, children: /* @__PURE__ */ jsxs("svg", { width: "22", height: "22", fill: "none", stroke: "#bbb", strokeWidth: "1.8", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ jsx("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }),
            /* @__PURE__ */ jsx("circle", { cx: "8.5", cy: "8.5", r: "1.5" }),
            /* @__PURE__ */ jsx("polyline", { points: "21 15 16 10 5 21" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { style: s$2.photoText, children: value ? value.name : "Click to select image" }),
            /* @__PURE__ */ jsx("div", { style: s$2.photoChange, children: value ? "Tap to change" : "JPG, PNG, HEIC supported" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        ref: inputRef,
        type: "file",
        accept: "image/*",
        style: { display: "none" },
        onChange: (e) => {
          if (e.target.files[0]) onChange(e.target.files[0]);
        }
      }
    )
  ] });
};
function formatZohoDate(isoDate) {
  if (!isoDate) return "";
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const d = /* @__PURE__ */ new Date(isoDate + "T00:00:00");
  const dd = String(d.getDate()).padStart(2, "0");
  const mmm = MONTHS[d.getMonth()];
  const yyyy = d.getFullYear();
  return `${dd}-${mmm}-${yyyy}`;
}
function buildZohoFields$1(f, sc, pipelineStage) {
  return {
    Full_Name: f.FullName,
    Mobile_Number: f.Phone,
    Gender1: f.Gender,
    Age: f.Age,
    Marital_Status: f.MaritalStatus,
    Street_Address: f.Street,
    Current_City: f.CurrentCity,
    State: f.State,
    Native_City: f.NativeCity,
    City: f.PrefCity,
    Service_Type: f.ServiceType,
    Service_Format: f.ServiceFormat,
    Status: f.Status,
    Helper_s_Available_From: formatZohoDate(f.AvailableFrom),
    Pipeline_Stage: pipelineStage,
    SC_Assigned: f.SCAssigned,
    SC_Email: sc?.email || "",
    SC_User: sc?.name || "",
    Referred_By: f.ReferredBy,
    Urgency: f.Availability,
    Experience_Required: f.YearsOfExperience,
    Monthly_Budget: f.SalaryExpectation,
    Tasks_Needed: f.Tasks,
    House_Size: f.HouseSize,
    People_At_Home: f.PeopleAtHome,
    Pets_At_Home: f.PetsAtHome,
    Comfortable_With_Pets: f.ComfortablePets,
    Child_Age: f.ChildAge,
    Child_Duties: f.ChildDuties,
    Cuisine_Preference: f.CuisinePref,
    Comfortable_Family_Size: f.ComfortableFamilySize,
    Meal_Preferences: f.MealPref,
    Vehicle_Type: f.VehicleType,
    Driving_License: f.DrivingLicense,
    Japa_Child_Duties: f.JapaDuties,
    Japa_Mother_Duties: f.JapaMotherNeeds,
    Patient_Age: f.PatientAge,
    Patient_Gender: f.PatientGender,
    Care_Needed: f.CareNeeded
  };
}
function SupplyForm() {
  const [form, setForm] = useState({ ...INIT$2 });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");
  const navigate = useNavigate();
  const setF = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => {
      const c = { ...e };
      delete c[k];
      return c;
    });
  };
  const toggleArr = (k, v) => {
    setForm((f) => ({
      ...f,
      [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v]
    }));
    if (errors[k]) setErrors((e) => {
      const c = { ...e };
      delete c[k];
      return c;
    });
  };
  const validate = () => {
    const e = {};
    if (!form.FullName.trim()) e.FullName = "Full name is required";
    if (!form.Phone || form.Phone.length !== 10 || !/^[6-9]/.test(form.Phone))
      e.Phone = "Enter a valid 10-digit Indian mobile number";
    if (!form.Gender) e.Gender = "Gender is required";
    if (!form.Age || isNaN(form.Age) || Number(form.Age) < 18 || Number(form.Age) > 70)
      e.Age = "Enter a valid age (18–70)";
    if (!form.Street.trim()) e.Street = "Street / area is required";
    if (!form.CurrentCity.trim()) e.CurrentCity = "City is required";
    if (!form.NativeCity.trim()) e.NativeCity = "Native city is required";
    if (!form.PrefCity.trim()) e.PrefCity = "Preferred city is required";
    if (!form.Status) e.Status = "Status is required";
    if (!form.ServiceType) e.ServiceType = "Please select a service type";
    if (!form.ServiceFormat) e.ServiceFormat = "Service format is required";
    if (!form.ReferredBy.trim()) e.ReferredBy = "Referred by is required";
    if (!form.SCAssigned) e.SCAssigned = "SC Assigned is required";
    if (!form.Availability) e.Availability = "Availability is required";
    if (!form.SalaryExpectation.trim()) e.SalaryExpectation = "Salary expectation is required";
    if (form.Status === "Will be Available Soon") {
      if (!form.AvailableFrom) {
        e.AvailableFrom = "Please set Helper's Available From date when status is 'Will be Available Soon'";
      } else {
        const today = /* @__PURE__ */ new Date();
        today.setHours(0, 0, 0, 0);
        const avDate = new Date(form.AvailableFrom);
        if (avDate < today) e.AvailableFrom = "Available From date cannot be in the past";
      }
    }
    if (form.ServiceType === "Live-In Support" && form.Tasks.length === 0) e.Tasks = "Select at least one task";
    if (form.ServiceType === "Live-In Support" && !form.ComfortablePets) e.ComfortablePets = "Please select pet preference";
    if (form.ServiceType === "Cooking Help" && form.CuisinePref.length === 0) e.CuisinePref = "Select at least one cuisine";
    if (form.ServiceType === "Baby Caretaker" && !form.ChildAge) e.ChildAge = "Select child's age group";
    if (form.ServiceType === "Baby Caretaker" && form.ChildDuties.length === 0) e.ChildDuties = "Select at least one duty";
    if (form.ServiceType === "Patient Care" && !form.PatientAge.trim()) e.PatientAge = "Patient age is required";
    if (form.ServiceType === "Patient Care" && form.CareNeeded.length === 0) e.CareNeeded = "Select at least one care type";
    if (form.ServiceType === "Driver" && form.VehicleType.length === 0) e.VehicleType = "Select at least one vehicle type";
    if (form.ServiceType === "Japa" && form.JapaDuties.length === 0) e.JapaDuties = "Select at least one Japa duty";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleSubmit = async () => {
    if (!validate()) {
      const firstErrEl = document.querySelector("[data-err='true']");
      if (firstErrEl) firstErrEl.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitting(true);
    setStatus(null);
    try {
      const sc = scList.find((x) => x.name === form.SCAssigned);
      const zohoFields = buildZohoFields$1(form, sc, PIPELINE_STAGE_DEFAULT);
      const formData = new FormData();
      formData.append("zohoFields", JSON.stringify(zohoFields));
      if (form.Photograph) formData.append("Photograph", form.Photograph);
      if (form.AadharCard) formData.append("Aadhaar_Card", form.AadharCard);
      if (form.AadharCardBack) formData.append("Aadhar_Card_Back", form.AadharCardBack);
      await axios.post(`${API_BASE$3}/submit-supply`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setStatus("success");
      setStatusMsg("Helper profile submitted successfully! Our team will review it shortly.");
      setForm({ ...INIT$2 });
      navigate("/thank-you", { state: { fromForm: "supply" } });
    } catch (err) {
      setStatus("error");
      setStatusMsg(err?.response?.data?.error || "Something went wrong. Please try again or call us on +91 92112 98139.");
    }
    setSubmitting(false);
  };
  const svc = form.ServiceType;
  return /* @__PURE__ */ jsx("div", { style: s$2.page, children: /* @__PURE__ */ jsxs("div", { style: s$2.card, children: [
    /* @__PURE__ */ jsxs("div", { style: s$2.header, children: [
      /* @__PURE__ */ jsx("div", { style: s$2.logoBox, children: /* @__PURE__ */ jsx("img", { src: "./logoOnly.webp", alt: "DomesticPro logo", style: { maxWidth: "100%", maxHeight: "100%" } }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { style: s$2.headerTitle, children: "DomesticPro – Helper Registration" }),
        /* @__PURE__ */ jsx("p", { style: s$2.headerTitle, children: "Supply Onboarding Form" }),
        /* @__PURE__ */ jsx("p", { style: s$2.headerSub, children: "Register a new helper profile with complete details and documents." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: s$2.body, children: [
      /* @__PURE__ */ jsx(SectionBar$1, { children: "Personal Details" }),
      /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
        /* @__PURE__ */ jsxs("label", { style: s$2.label, children: [
          "Full Name",
          /* @__PURE__ */ jsx("span", { style: s$2.req, children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: form.FullName,
            onChange: (e) => setF("FullName", e.target.value),
            placeholder: "e.g. Priya Kumari",
            style: s$2.input
          }
        ),
        /* @__PURE__ */ jsx(Err$1, { msg: errors.FullName })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
        /* @__PURE__ */ jsxs("label", { style: s$2.label, children: [
          "Mobile Number",
          /* @__PURE__ */ jsx("span", { style: s$2.req, children: "*" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: s$2.phoneWrap, children: [
          /* @__PURE__ */ jsx("span", { style: s$2.phonePrefix, children: "+91" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "tel",
              inputMode: "numeric",
              maxLength: 10,
              value: form.Phone,
              onChange: (e) => setF("Phone", e.target.value.replace(/\D/g, "").slice(0, 10)),
              placeholder: "98765 43210",
              style: s$2.phoneInput
            }
          )
        ] }),
        /* @__PURE__ */ jsx(Err$1, { msg: errors.Phone })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: s$2.row2, children: [
        /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
          /* @__PURE__ */ jsxs("label", { style: s$2.label, children: [
            "Gender",
            /* @__PURE__ */ jsx("span", { style: s$2.req, children: "*" })
          ] }),
          /* @__PURE__ */ jsxs("select", { value: form.Gender, onChange: (e) => setF("Gender", e.target.value), style: s$2.select, children: [
            /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Select…" }),
            GENDER_OPTIONS$1.map((o) => /* @__PURE__ */ jsx("option", { value: o, children: o }, o))
          ] }),
          /* @__PURE__ */ jsx(Err$1, { msg: errors.Gender })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
          /* @__PURE__ */ jsxs("label", { style: s$2.label, children: [
            "Age",
            /* @__PURE__ */ jsx("span", { style: s$2.req, children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              value: form.Age,
              onChange: (e) => setF("Age", e.target.value),
              placeholder: "e.g. 28",
              style: s$2.input,
              min: "18",
              max: "70"
            }
          ),
          /* @__PURE__ */ jsx(Err$1, { msg: errors.Age })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
        /* @__PURE__ */ jsx("label", { style: s$2.label, children: "Marital Status" }),
        /* @__PURE__ */ jsxs("select", { value: form.MaritalStatus, onChange: (e) => setF("MaritalStatus", e.target.value), style: s$2.select, children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Select…" }),
          MARITAL_OPTIONS.map((o) => /* @__PURE__ */ jsx("option", { value: o, children: o }, o))
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
        /* @__PURE__ */ jsxs("label", { style: s$2.label, children: [
          "Current Address",
          /* @__PURE__ */ jsx("span", { style: s$2.req, children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: form.Street,
            onChange: (e) => setF("Street", e.target.value),
            placeholder: "Street / Area / Locality",
            style: { ...s$2.input, marginBottom: 8 }
          }
        ),
        /* @__PURE__ */ jsx(Err$1, { msg: errors.Street }),
        /* @__PURE__ */ jsxs("div", { style: s$2.row2, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: form.CurrentCity,
                onChange: (e) => setF("CurrentCity", e.target.value),
                placeholder: "City",
                style: s$2.input
              }
            ),
            /* @__PURE__ */ jsx(Err$1, { msg: errors.CurrentCity })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: form.State,
              onChange: (e) => setF("State", e.target.value),
              placeholder: "State",
              style: s$2.input
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
        /* @__PURE__ */ jsxs("label", { style: s$2.label, children: [
          "Native City",
          /* @__PURE__ */ jsx("span", { style: s$2.req, children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: form.NativeCity,
            onChange: (e) => setF("NativeCity", e.target.value),
            placeholder: "e.g. Patna",
            style: s$2.input
          }
        ),
        /* @__PURE__ */ jsx(Err$1, { msg: errors.NativeCity })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
        /* @__PURE__ */ jsxs("label", { style: s$2.label, children: [
          "Preferred Work Areas",
          /* @__PURE__ */ jsx("span", { style: s$2.req, children: "*" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: s$2.row2, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: form.PrefCity,
                onChange: (e) => setF("PrefCity", e.target.value),
                placeholder: "City",
                style: s$2.input
              }
            ),
            /* @__PURE__ */ jsx(Err$1, { msg: errors.PrefCity })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: form.PrefState,
              onChange: (e) => setF("PrefState", e.target.value),
              placeholder: "State",
              style: s$2.input
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(SectionBar$1, { children: "Status & Service" }),
      /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
        /* @__PURE__ */ jsxs("label", { style: s$2.label, children: [
          "Status",
          /* @__PURE__ */ jsx("span", { style: s$2.req, children: "*" })
        ] }),
        /* @__PURE__ */ jsx("div", { style: s$2.radioRowH, children: STATUS_OPTIONS.map((o) => /* @__PURE__ */ jsxs("label", { style: s$2.radioLabel, children: [
          /* @__PURE__ */ jsx("input", { type: "radio", style: s$2.radioInput, name: "status", checked: form.Status === o, onChange: () => setF("Status", o) }),
          o
        ] }, o)) }),
        /* @__PURE__ */ jsx(Err$1, { msg: errors.Status })
      ] }),
      form.Status === "Will be Available Soon" && /* @__PURE__ */ jsxs("div", { style: s$2.field, "data-err": !!errors.AvailableFrom ? "true" : "false", children: [
        /* @__PURE__ */ jsxs("label", { style: s$2.label, children: [
          "Helper's Available From",
          /* @__PURE__ */ jsx("span", { style: s$2.req, children: "*" })
        ] }),
        /* @__PURE__ */ jsx("div", { style: { ...{ fontSize: 11, color: "#856404", background: "#fff3cd", border: "1px solid #ffc107", borderRadius: 3, padding: "4px 8px", marginBottom: 8, display: "inline-block" } }, children: 'Required when status is "Will be Available Soon"' }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "date",
            value: form.AvailableFrom,
            onChange: (e) => setF("AvailableFrom", e.target.value),
            min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
            style: s$2.input
          }
        ),
        /* @__PURE__ */ jsx(Err$1, { msg: errors.AvailableFrom })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
        /* @__PURE__ */ jsxs("label", { style: s$2.label, children: [
          "Service Type",
          /* @__PURE__ */ jsx("span", { style: s$2.req, children: "*" })
        ] }),
        /* @__PURE__ */ jsxs("select", { value: form.ServiceType, onChange: (e) => setF("ServiceType", e.target.value), style: s$2.select, children: [
          /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Please Select" }),
          SERVICE_TYPES$1.map((o) => /* @__PURE__ */ jsx("option", { value: o, children: o }, o))
        ] }),
        /* @__PURE__ */ jsx(Err$1, { msg: errors.ServiceType })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
        /* @__PURE__ */ jsxs("label", { style: s$2.label, children: [
          "Service Format",
          /* @__PURE__ */ jsx("span", { style: s$2.req, children: "*" })
        ] }),
        /* @__PURE__ */ jsx("div", { style: s$2.radioRowH, children: SERVICE_FORMATS$1.map((o) => /* @__PURE__ */ jsxs("label", { style: s$2.radioLabel, children: [
          /* @__PURE__ */ jsx("input", { type: "radio", style: s$2.radioInput, name: "serviceFormat", checked: form.ServiceFormat === o, onChange: () => setF("ServiceFormat", o) }),
          o
        ] }, o)) }),
        /* @__PURE__ */ jsx(Err$1, { msg: errors.ServiceFormat })
      ] }),
      svc === "Live-In Support" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(SectionBar$1, { children: "Live-In Support Details" }),
        /* @__PURE__ */ jsx(
          CheckboxGroup$1,
          {
            label: "Tasks Helper Can Perform",
            required: true,
            values: form.Tasks,
            onChange: (v) => toggleArr("Tasks", v),
            options: TASK_OPTIONS$1
          }
        ),
        /* @__PURE__ */ jsx(Err$1, { msg: errors.Tasks }),
        /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
          /* @__PURE__ */ jsx("label", { style: s$2.label, children: "House Size Comfortable With" }),
          /* @__PURE__ */ jsxs("select", { value: form.HouseSize, onChange: (e) => setF("HouseSize", e.target.value), style: s$2.select, children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Select…" }),
            HOUSE_SIZE_OPTIONS$1.map((o) => /* @__PURE__ */ jsx("option", { value: o, children: o }, o))
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
          /* @__PURE__ */ jsxs("label", { style: s$2.label, children: [
            "Comfortable With Pets?",
            /* @__PURE__ */ jsx("span", { style: s$2.req, children: "*" })
          ] }),
          /* @__PURE__ */ jsx("div", { style: s$2.radioRowH, children: ["Yes", "No"].map((o) => /* @__PURE__ */ jsxs("label", { style: s$2.radioLabel, children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "radio",
                style: s$2.radioInput,
                name: "comfortablePets",
                checked: form.ComfortablePets === o,
                onChange: () => setF("ComfortablePets", o)
              }
            ),
            o
          ] }, o)) }),
          /* @__PURE__ */ jsx(Err$1, { msg: errors.ComfortablePets })
        ] })
      ] }),
      svc === "Cooking Help" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(SectionBar$1, { children: "Cooking Help Details" }),
        /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
          /* @__PURE__ */ jsx("label", { style: s$2.label, children: "Meal Preference" }),
          /* @__PURE__ */ jsx("div", { style: s$2.radioRowH, children: MEAL_PREF_OPTIONS$1.map((o) => /* @__PURE__ */ jsxs("label", { style: s$2.radioLabel, children: [
            /* @__PURE__ */ jsx("input", { type: "radio", style: s$2.radioInput, name: "mealPref", checked: form.MealPref === o, onChange: () => setF("MealPref", o) }),
            o
          ] }, o)) })
        ] }),
        /* @__PURE__ */ jsx(
          CheckboxGroup$1,
          {
            label: "Cuisine Expertise",
            required: true,
            values: form.CuisinePref,
            onChange: (v) => toggleArr("CuisinePref", v),
            options: CUISINE_OPTIONS$1
          }
        ),
        /* @__PURE__ */ jsx(Err$1, { msg: errors.CuisinePref }),
        /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
          /* @__PURE__ */ jsx("label", { style: s$2.label, children: "Comfortable Cooking for Family Size of" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              value: form.ComfortableFamilySize,
              onChange: (e) => setF("ComfortableFamilySize", e.target.value),
              placeholder: "e.g. 4",
              style: s$2.input,
              min: "1",
              max: "20"
            }
          )
        ] })
      ] }),
      svc === "Baby Caretaker" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(SectionBar$1, { children: "Baby Caretaker Details" }),
        /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
          /* @__PURE__ */ jsxs("label", { style: s$2.label, children: [
            "Child Age Groups Handled",
            /* @__PURE__ */ jsx("span", { style: s$2.req, children: "*" })
          ] }),
          CHILD_AGE_OPTIONS$1.map((o) => /* @__PURE__ */ jsxs("label", { style: s$2.radioLabel, children: [
            /* @__PURE__ */ jsx("input", { type: "radio", style: s$2.radioInput, name: "childAge", checked: form.ChildAge === o, onChange: () => setF("ChildAge", o) }),
            o
          ] }, o)),
          /* @__PURE__ */ jsx(Err$1, { msg: errors.ChildAge })
        ] }),
        /* @__PURE__ */ jsx(
          CheckboxGroup$1,
          {
            label: "Skills / Tasks Can Perform",
            required: true,
            values: form.ChildDuties,
            onChange: (v) => toggleArr("ChildDuties", v),
            options: CHILD_DUTY_OPTIONS$1
          }
        ),
        /* @__PURE__ */ jsx(Err$1, { msg: errors.ChildDuties })
      ] }),
      svc === "Patient Care" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(SectionBar$1, { children: "Patient Care Details" }),
        /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
          /* @__PURE__ */ jsxs("label", { style: s$2.label, children: [
            "Patient Age Group",
            /* @__PURE__ */ jsx("span", { style: s$2.req, children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: form.PatientAge,
              onChange: (e) => setF("PatientAge", e.target.value),
              placeholder: "e.g. 60–70 years",
              style: s$2.input
            }
          ),
          /* @__PURE__ */ jsx(Err$1, { msg: errors.PatientAge })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
          /* @__PURE__ */ jsx("label", { style: s$2.label, children: "Patient Gender" }),
          /* @__PURE__ */ jsx("div", { style: s$2.radioRowH, children: PATIENT_GENDER_OPTIONS$1.map((o) => /* @__PURE__ */ jsxs("label", { style: s$2.radioLabel, children: [
            /* @__PURE__ */ jsx("input", { type: "radio", style: s$2.radioInput, name: "patientGender", checked: form.PatientGender === o, onChange: () => setF("PatientGender", o) }),
            o
          ] }, o)) })
        ] }),
        /* @__PURE__ */ jsx(
          CheckboxGroup$1,
          {
            label: "Care Types Provided",
            required: true,
            values: form.CareNeeded,
            onChange: (v) => toggleArr("CareNeeded", v),
            options: CARE_NEEDED_OPTIONS$1
          }
        ),
        /* @__PURE__ */ jsx(Err$1, { msg: errors.CareNeeded })
      ] }),
      svc === "Driver" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(SectionBar$1, { children: "Driver Details" }),
        /* @__PURE__ */ jsx(
          CheckboxGroup$1,
          {
            label: "Vehicle Types Can Drive",
            required: true,
            values: form.VehicleType,
            onChange: (v) => toggleArr("VehicleType", v),
            options: VEHICLE_TYPE_OPTIONS$1
          }
        ),
        /* @__PURE__ */ jsx(Err$1, { msg: errors.VehicleType }),
        /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
          /* @__PURE__ */ jsx("label", { style: s$2.label, children: "Has Driving License?" }),
          /* @__PURE__ */ jsx("div", { style: s$2.radioRowH, children: DRIVING_LICENSE_OPTIONS.map((o) => /* @__PURE__ */ jsxs("label", { style: s$2.radioLabel, children: [
            /* @__PURE__ */ jsx("input", { type: "radio", style: s$2.radioInput, name: "drivingLicense", checked: form.DrivingLicense === o, onChange: () => setF("DrivingLicense", o) }),
            o
          ] }, o)) })
        ] })
      ] }),
      svc === "Japa" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(SectionBar$1, { children: "Japa Details" }),
        /* @__PURE__ */ jsx(
          CheckboxGroup$1,
          {
            label: "Japa Duties (Newborn)",
            required: true,
            values: form.JapaDuties,
            onChange: (v) => toggleArr("JapaDuties", v),
            options: JAPA_DUTY_OPTIONS$1
          }
        ),
        /* @__PURE__ */ jsx(Err$1, { msg: errors.JapaDuties }),
        /* @__PURE__ */ jsx(
          CheckboxGroup$1,
          {
            label: "Mother's Care Services",
            values: form.JapaMotherNeeds,
            onChange: (v) => toggleArr("JapaMotherNeeds", v),
            options: JAPA_MOTHER_OPTIONS$1
          }
        )
      ] }),
      /* @__PURE__ */ jsx(SectionBar$1, { children: "Assignment & Contact" }),
      /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
        /* @__PURE__ */ jsx("label", { style: s$2.label, children: "Email Address" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            value: form.Email,
            onChange: (e) => setF("Email", e.target.value),
            placeholder: "helper@example.com",
            style: s$2.input
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { style: s$2.row2, children: [
        /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
          /* @__PURE__ */ jsxs("label", { style: s$2.label, children: [
            "Referred By",
            /* @__PURE__ */ jsx("span", { style: s$2.req, children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: form.ReferredBy,
              onChange: (e) => setF("ReferredBy", e.target.value),
              placeholder: "e.g. DP001 (Agent's code)",
              style: s$2.input
            }
          ),
          /* @__PURE__ */ jsx(Err$1, { msg: errors.ReferredBy })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
          /* @__PURE__ */ jsxs("label", { style: s$2.label, children: [
            "SC Assigned",
            /* @__PURE__ */ jsx("span", { style: s$2.req, children: "*" })
          ] }),
          /* @__PURE__ */ jsxs("select", { value: form.SCAssigned, onChange: (e) => setF("SCAssigned", e.target.value), style: s$2.select, children: [
            /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Select SC…" }),
            scList.map((sc) => /* @__PURE__ */ jsx("option", { value: sc.name, children: sc.name }, sc.id))
          ] }),
          /* @__PURE__ */ jsx(Err$1, { msg: errors.SCAssigned })
        ] })
      ] }),
      /* @__PURE__ */ jsx(SectionBar$1, { children: "Documents & Photo" }),
      /* @__PURE__ */ jsx(
        PhotoUpload,
        {
          label: "Photograph",
          value: form.Photograph,
          onChange: (f) => setF("Photograph", f),
          fieldKey: "Photograph"
        }
      ),
      /* @__PURE__ */ jsx(
        PhotoUpload,
        {
          label: "Aadhar Card (Front)",
          value: form.AadharCard,
          onChange: (f) => setF("AadharCard", f),
          fieldKey: "AadharCard"
        }
      ),
      /* @__PURE__ */ jsx(
        PhotoUpload,
        {
          label: "Aadhar Card (Back)",
          value: form.AadharCardBack,
          onChange: (f) => setF("AadharCardBack", f),
          fieldKey: "AadharCardBack"
        }
      ),
      /* @__PURE__ */ jsx(SectionBar$1, { children: "Availability & Expectations" }),
      /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
        /* @__PURE__ */ jsxs("label", { style: s$2.label, children: [
          "Availability",
          /* @__PURE__ */ jsx("span", { style: s$2.req, children: "*" })
        ] }),
        /* @__PURE__ */ jsx("div", { style: s$2.radioRowH, children: AVAILABILITY_OPTIONS.map((o) => /* @__PURE__ */ jsxs("label", { style: s$2.radioLabel, children: [
          /* @__PURE__ */ jsx("input", { type: "radio", style: s$2.radioInput, name: "availability", checked: form.Availability === o, onChange: () => setF("Availability", o) }),
          o
        ] }, o)) }),
        /* @__PURE__ */ jsx(Err$1, { msg: errors.Availability })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: s$2.row2, children: [
        /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
          /* @__PURE__ */ jsxs("label", { style: s$2.label, children: [
            "Salary Expectation (₹/month)",
            /* @__PURE__ */ jsx("span", { style: s$2.req, children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: form.SalaryExpectation,
              onChange: (e) => setF("SalaryExpectation", e.target.value),
              placeholder: "e.g. ₹12,000",
              style: s$2.input
            }
          ),
          /* @__PURE__ */ jsx(Err$1, { msg: errors.SalaryExpectation })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
          /* @__PURE__ */ jsx("label", { style: s$2.label, children: "Years of Experience" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              value: form.YearsOfExperience,
              onChange: (e) => setF("YearsOfExperience", e.target.value),
              placeholder: "e.g. 3",
              style: s$2.input,
              min: "0",
              max: "40"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: s$2.field, children: [
        /* @__PURE__ */ jsx("label", { style: s$2.label, children: "Special Instructions" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            rows: 3,
            maxLength: 500,
            value: form.Instructions,
            onChange: (e) => setF("Instructions", e.target.value),
            placeholder: "Any specific notes, language spoken, health conditions, restrictions…",
            style: s$2.textarea
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: handleSubmit,
          disabled: submitting,
          style: submitting ? s$2.submitBtnDisabled : s$2.submitBtn,
          children: submitting ? "Submitting…" : "Submit Helper Profile →"
        }
      ),
      status === "success" && /* @__PURE__ */ jsxs("div", { style: s$2.successBanner, children: [
        "✓ ",
        statusMsg
      ] }),
      status === "error" && /* @__PURE__ */ jsxs("div", { style: s$2.errorBanner, children: [
        "⚠ ",
        statusMsg
      ] })
    ] })
  ] }) });
}
const API_BASE$2 = "http://localhost:8000";
const INIT$1 = {
  Name: "",
  Phone: "",
  Address: ""
};
const s$1 = {
  page: {
    minHeight: "100vh",
    background: "#F5F5F5",
    padding: "24px 16px 48px",
    fontFamily: "'Segoe UI', Arial, sans-serif"
  },
  card: {
    maxWidth: "40rem",
    margin: "0 auto",
    background: "#fff",
    borderRadius: 4,
    border: "1px solid #ddd",
    overflow: "hidden"
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "20px 24px",
    borderBottom: "2px solid #EC5F36",
    background: "#fff"
  },
  logoBox: {
    width: "6.5rem",
    height: 64,
    background: "#ffffff",
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  headerTitle: { fontSize: 20, fontWeight: 700, color: "#111", lineHeight: 1.3, margin: 0 },
  headerSub: { fontSize: 12, color: "#777", marginTop: 3 },
  body: {
    padding: "24px"
  },
  field: {
    marginBottom: 16
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 5,
    color: "#333"
  },
  req: {
    color: "#EC5F36",
    marginLeft: 2
  },
  input: {
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: 3,
    padding: "8px 10px",
    fontSize: 14,
    outline: "none"
  },
  textarea: {
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: 3,
    padding: "8px 10px",
    fontSize: 14,
    minHeight: 80,
    resize: "vertical",
    outline: "none"
  },
  phoneWrap: {
    display: "flex"
  },
  phonePrefix: {
    background: "#f4f4f4",
    border: "1px solid #ccc",
    borderRight: "none",
    borderRadius: "3px 0 0 3px",
    padding: "8px 10px",
    fontSize: 14,
    color: "#555",
    display: "flex",
    alignItems: "center"
  },
  phoneInput: {
    flex: 1,
    border: "1px solid #ccc",
    borderRadius: "0 3px 3px 0",
    padding: "8px 10px",
    fontSize: 14,
    outline: "none"
  },
  errText: {
    fontSize: 11,
    color: "#c00",
    marginTop: 4
  },
  btn: {
    width: "100%",
    padding: "11px",
    background: "#EC5F36",
    color: "#fff",
    border: "none",
    borderRadius: 3,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 10
  },
  btnDisabled: {
    width: "100%",
    padding: "11px",
    background: "#ddd",
    color: "#999",
    border: "none",
    borderRadius: 3,
    fontSize: 15,
    fontWeight: 700,
    cursor: "not-allowed",
    marginTop: 10
  },
  success: {
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: 3,
    padding: "12px",
    marginTop: 12,
    color: "#166534",
    fontWeight: 600,
    fontSize: 13
  },
  error: {
    background: "#fff5f5",
    border: "1px solid #fecaca",
    borderRadius: 3,
    padding: "12px",
    marginTop: 12,
    color: "#991b1b",
    fontWeight: 600,
    fontSize: 13
  }
};
function AgentForm() {
  const [form, setForm] = useState(INIT$1);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");
  const navigate = useNavigate();
  const setF = (k, v) => {
    setForm((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) {
      const copy = { ...errors };
      delete copy[k];
      setErrors(copy);
    }
  };
  function buildZohoFields2(f) {
    return {
      Full_Name: f.Name,
      Mobile_Number: f.Phone,
      Address: f.Address,
      Status: f.Status
    };
  }
  const validate = () => {
    const e = {};
    if (!form.Name.trim()) e.Name = "Name is required";
    if (!form.Phone || form.Phone.length !== 10 || !/^[6-9]/.test(form.Phone)) {
      e.Phone = "Enter valid 10-digit Indian mobile number";
    }
    if (!form.Address.trim()) e.Address = "Address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setStatus(null);
    try {
      const zohoFields = buildZohoFields2({
        ...form,
        Status: "Active"
      });
      await axios.post(`${API_BASE$2}/agent-submit`, { zohoFields });
      setForm(INIT$1);
      navigate("/thank-you", { state: { fromForm: "agent" } });
    } catch (err) {
      setStatus("error");
      setStatusMsg(
        err?.response?.data?.error || "Something went wrong. Please try again."
      );
    }
    setSubmitting(false);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SEO, { title: "Agent Form", description: "", noIndex: true }),
    /* @__PURE__ */ jsx("div", { style: s$1.page, children: /* @__PURE__ */ jsxs("div", { style: s$1.card, children: [
      /* @__PURE__ */ jsxs("div", { style: s$1.header, children: [
        /* @__PURE__ */ jsx("div", { style: s$1.logoBox, children: /* @__PURE__ */ jsx("img", { src: "./logoOnly.webp", alt: "Domestic Pro logo" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { style: s$1.headerTitle, children: "Agent Registration Form" }),
          /* @__PURE__ */ jsx("p", { style: s$1.headerSub, children: "Submit your details to supply helpers with DomesticPro." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: s$1.body, children: [
        /* @__PURE__ */ jsxs("div", { style: s$1.field, children: [
          /* @__PURE__ */ jsxs("label", { style: s$1.label, children: [
            "Full Name ",
            /* @__PURE__ */ jsx("span", { style: s$1.req, children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: form.Name,
              onChange: (e) => setF("Name", e.target.value),
              placeholder: "Enter your name",
              style: s$1.input
            }
          ),
          errors.Name && /* @__PURE__ */ jsx("div", { style: s$1.errText, children: errors.Name })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: s$1.field, children: [
          /* @__PURE__ */ jsxs("label", { style: s$1.label, children: [
            "Phone Number ",
            /* @__PURE__ */ jsx("span", { style: s$1.req, children: "*" })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: s$1.phoneWrap, children: [
            /* @__PURE__ */ jsx("span", { style: s$1.phonePrefix, children: "+91" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "tel",
                value: form.Phone,
                onChange: (e) => setF("Phone", e.target.value.replace(/\D/g, "").slice(0, 10)),
                placeholder: "9876543210",
                style: s$1.phoneInput
              }
            )
          ] }),
          errors.Phone && /* @__PURE__ */ jsx("div", { style: s$1.errText, children: errors.Phone })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: s$1.field, children: [
          /* @__PURE__ */ jsxs("label", { style: s$1.label, children: [
            "Address ",
            /* @__PURE__ */ jsx("span", { style: s$1.req, children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: form.Address,
              onChange: (e) => setF("Address", e.target.value),
              placeholder: "Enter your address",
              style: s$1.textarea
            }
          ),
          errors.Address && /* @__PURE__ */ jsx("div", { style: s$1.errText, children: errors.Address })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleSubmit,
            disabled: submitting,
            style: submitting ? s$1.btnDisabled : s$1.btn,
            children: submitting ? "Submitting..." : "Submit Details →"
          }
        ),
        status === "success" && /* @__PURE__ */ jsx("div", { style: s$1.success, children: statusMsg }),
        status === "error" && /* @__PURE__ */ jsx("div", { style: s$1.error, children: statusMsg })
      ] })
    ] }) })
  ] });
}
const API_BASE$1 = "http://localhost:8000";
function buildZohoFields(f) {
  return {
    Full_Name: `${f.FirstName} ${f.LastName}`.trim(),
    First_Name: f.FirstName,
    Last_Name: f.LastName,
    Mobile_Number: f.Phone,
    Email: f.Email,
    Street_Address: f.Street,
    City: f.City,
    Service_Type: f.ServiceType,
    Service_Format: f.ServiceFormat,
    Tasks_Needed: f.Tasks,
    House_Size: f.HouseSize,
    People_At_Home: f.PeopleAtHome,
    Pets_At_Home: f.PetsAtHome,
    Meal_Preferences: f.MealPref,
    Cuisine_Preference: f.CuisinePref,
    Helper_s_Gender: f.Cook_Gender,
    // ✅ FIXED
    Cook_Members: String(f.Cook_Members || ""),
    // ✅ FIXED
    Child_Age: f.ChildAge,
    Child_Duties: f.ChildDuties,
    Japa_Child_Duties: f.JapaDuties,
    Japa_Mother_Duties: f.JapaMotherNeeds,
    Patient_Age: f.PatientAge,
    Patient_Gender: f.PatientGender,
    Care_Needed: f.CareNeeded,
    Vehicle_Type: f.VehicleType,
    Monthly_Budget: f.Budget,
    Urgency: f.Urgency,
    Special_Instructions: f.Instructions,
    Plan_Type: f.PlanType,
    Payment_Status: f.PaymentStatus
  };
}
const SERVICE_TYPES = [
  "Live-In Support",
  "Cooking Help",
  "Baby Caretaker",
  "Patient Care",
  "Driver",
  "Japa"
];
const SERVICE_FORMATS = ["Live-In", "Substitute"];
const TASK_OPTIONS = [
  "Cleaning",
  "Utensils",
  "Laundry",
  "Dusting",
  "Bathroom",
  "Groceries",
  "Other"
];
const HOUSE_SIZE_OPTIONS = ["1BHK", "2BHK", "3BHK", "4BHK", "Villa"];
const PETS_OPTIONS = ["Yes", "No"];
const MEAL_PREF_OPTIONS = ["Veg", "Non-Veg", "Both"];
const CUISINE_OPTIONS = [
  "North Indian",
  "South Indian",
  "Chinese",
  "Continental",
  "Diet Food",
  "Other"
];
const CHILD_DUTY_OPTIONS = [
  "Feeding",
  "Bathing",
  "Homework",
  "Playtime",
  "Putting to sleep",
  "Other"
];
const CHILD_AGE_OPTIONS = ["0 - 1 Year", "2 - 5 Years", "6 - 12 Years", "13+ Years"];
const PATIENT_GENDER_OPTIONS = ["Male", "Female", "Other"];
const CARE_NEEDED_OPTIONS = [
  "Basic Support",
  "Personal Hygiene",
  "Mobility Support",
  "Medicine Reminders",
  "Full Care"
];
const VEHICLE_TYPE_OPTIONS = ["Manual", "Automatic", "SUV", "Sedan"];
const JAPA_DUTY_OPTIONS = [
  "Newborn Bath",
  "Feeding Support",
  "Swaddling",
  "Night Watch",
  "Other"
];
const JAPA_MOTHER_OPTIONS = [
  "Body Massage",
  "Diet & Nutrition",
  "Light Cooking",
  "Night Support",
  "Personal Hygiene",
  "Other"
];
const GENDER_OPTIONS = ["Male", "Female", "Any"];
const URGENCY_OPTIONS = ["Immediately", "Within 7–15 days", "Within 30 days"];
const BUDGET_OPTIONS = ["₹25,000+", "₹18,000 – ₹24,999", "₹15,000 – ₹17,999"];
const INIT = {
  FirstName: "",
  LastName: "",
  Phone: "",
  Email: "",
  City: "",
  Street: "",
  ServiceType: "",
  ServiceFormat: "",
  Cook_Gender: "",
  Budget: "",
  Urgency: "",
  Tasks: [],
  HouseSize: "",
  PeopleAtHome: "",
  PetsAtHome: "",
  MealPref: "",
  CuisinePref: [],
  Cook_Members: "",
  ChildAge: "",
  ChildDuties: [],
  PatientAge: "",
  PatientGender: "",
  CareNeeded: [],
  VehicleType: [],
  NewbornAge: "",
  JapaDuties: [],
  JapaMotherNeeds: [],
  Instructions: ""
};
const s = {
  page: {
    minHeight: "100vh",
    background: "#F5F5F5",
    padding: "24px 16px 48px",
    fontFamily: "'Segoe UI', Arial, sans-serif"
  },
  card: {
    maxWidth: "50rem",
    margin: "0 auto",
    background: "#fff",
    borderRadius: 4,
    border: "1px solid #ddd",
    overflow: "hidden"
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "20px 24px",
    borderBottom: "2px solid #EC5F36",
    background: "#fff"
  },
  logoBox: {
    width: "6.5rem",
    height: 64,
    background: "#ffffff",
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  headerTitle: { fontSize: 20, fontWeight: 700, color: "#111", lineHeight: 1.3, margin: 0 },
  headerSub: { fontSize: 12, color: "#777", marginTop: 3 },
  body: { padding: "0 24px 24px" },
  sectionBar: {
    background: "#f9f9f9",
    borderLeft: "3px solid #EC5F36",
    padding: "7px 12px",
    margin: "24px -24px 18px",
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    color: "#EC5F36"
  },
  field: { marginBottom: 14 },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#333",
    marginBottom: 5
  },
  req: { color: "#EC5F36", marginLeft: 2 },
  input: {
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: 3,
    padding: "7px 10px",
    fontSize: 14,
    color: "#111",
    background: "#fff",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit"
  },
  inputFocus: { borderColor: "#EC5F36" },
  select: {
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: 3,
    padding: "7px 10px",
    fontSize: 14,
    color: "#111",
    background: "#fff",
    outline: "none",
    boxSizing: "border-box",
    appearance: "none",
    cursor: "pointer",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
    fontFamily: "inherit"
  },
  textarea: {
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: 3,
    padding: "7px 10px",
    fontSize: 14,
    color: "#111",
    background: "#fff",
    outline: "none",
    resize: "vertical",
    minHeight: 80,
    boxSizing: "border-box",
    fontFamily: "inherit"
  },
  radioRow: { display: "flex", flexDirection: "column", gap: 7, marginTop: 2 },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    color: "#222",
    cursor: "pointer",
    fontWeight: 400
  },
  radioInput: { width: 15, height: 15, accentColor: "#EC5F36", cursor: "pointer", margin: 0 },
  checkLabel: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    color: "#222",
    cursor: "pointer",
    fontWeight: 400
  },
  checkInput: { width: 14, height: 14, accentColor: "#EC5F36", cursor: "pointer", margin: 0 },
  row2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
  phoneWrap: { display: "flex" },
  phonePrefix: {
    background: "#f4f4f4",
    border: "1px solid #ccc",
    borderRight: "none",
    borderRadius: "3px 0 0 3px",
    padding: "7px 10px",
    fontSize: 14,
    color: "#555",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center"
  },
  phoneInput: {
    flex: 1,
    border: "1px solid #ccc",
    borderRadius: "0 3px 3px 0",
    padding: "7px 10px",
    fontSize: 14,
    color: "#111",
    background: "#fff",
    outline: "none",
    fontFamily: "inherit"
  },
  errText: { fontSize: 11, color: "#c00", marginTop: 3, display: "block" },
  submitBtn: {
    width: "100%",
    padding: "11px",
    background: "#EC5F36",
    color: "#fff",
    border: "none",
    borderRadius: 3,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 24,
    letterSpacing: "0.01em"
  },
  submitBtnDisabled: {
    width: "100%",
    padding: "11px",
    background: "#ddd",
    color: "#999",
    border: "none",
    borderRadius: 3,
    fontSize: 15,
    fontWeight: 700,
    cursor: "not-allowed",
    marginTop: 24
  },
  successBanner: {
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: 3,
    padding: "12px 14px",
    fontSize: 13,
    color: "#166534",
    fontWeight: 600,
    marginTop: 14
  },
  errorBanner: {
    background: "#fff5f5",
    border: "1px solid #fecaca",
    borderRadius: 3,
    padding: "12px 14px",
    fontSize: 13,
    color: "#991b1b",
    fontWeight: 600,
    marginTop: 14
  }
};
const SectionBar = ({ children }) => /* @__PURE__ */ jsx("div", { style: s.sectionBar, children });
const Err = ({ msg }) => msg ? /* @__PURE__ */ jsx("span", { style: s.errText, children: msg }) : null;
const TextInput = ({ label, required, value, onChange, placeholder, type = "text", maxLength, style }) => {
  const [focused, setFocused] = useState(false);
  return /* @__PURE__ */ jsxs("div", { style: { ...s.field, ...style }, children: [
    /* @__PURE__ */ jsxs("label", { style: s.label, children: [
      label,
      required && /* @__PURE__ */ jsx("span", { style: s.req, children: "*" })
    ] }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type,
        value,
        onChange,
        placeholder,
        maxLength,
        style: { ...s.input, ...focused ? s.inputFocus : {} },
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(false)
      }
    )
  ] });
};
const CheckboxGroup = ({ label, required, values, onChange, options }) => /* @__PURE__ */ jsxs("div", { style: s.field, children: [
  /* @__PURE__ */ jsxs("label", { style: s.label, children: [
    label,
    required && /* @__PURE__ */ jsx("span", { style: s.req, children: "*" })
  ] }),
  /* @__PURE__ */ jsx("div", { style: s.radioRow, children: options.map((o) => /* @__PURE__ */ jsxs("label", { style: s.checkLabel, children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "checkbox",
        style: s.checkInput,
        checked: values.includes(o),
        onChange: () => onChange(o)
      }
    ),
    o
  ] }, o)) })
] });
function DemandForm() {
  const [form, setForm] = useState({ ...INIT });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");
  const navigate = useNavigate();
  const setF = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => {
      const c = { ...e };
      delete c[k];
      return c;
    });
  };
  const toggleArr = (k, v) => {
    setForm((f) => ({
      ...f,
      [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v]
    }));
    if (errors[k]) setErrors((e) => {
      const c = { ...e };
      delete c[k];
      return c;
    });
  };
  const validate = () => {
    const e = {};
    if (!form.FirstName.trim()) e.FirstName = "First name is required";
    if (!form.Phone || form.Phone.length !== 10 || !/^[6-9]/.test(form.Phone))
      e.Phone = "Enter a valid 10-digit Indian mobile number";
    if (!form.City.trim()) e.City = "City is required";
    if (!form.Street.trim()) e.Street = "Street / area is required";
    if (!form.ServiceType) e.ServiceType = "Please select a service type";
    if (!form.Cook_Gender) e.Cook_Gender = "Helper's gender is required";
    if (!form.ServiceFormat) e.ServiceFormat = "Work type is required";
    if (!form.Urgency) e.Urgency = "Urgency is required";
    if (!form.Budget) e.Budget = "Please select a budget";
    if (form.ServiceType === "Live-In Support" && form.Tasks.length === 0) e.Tasks = "Select at least one task";
    if (form.ServiceType === "Cooking Help" && form.CuisinePref.length === 0) e.CuisinePref = "Select at least one cuisine";
    if (form.ServiceType === "Baby Caretaker" && !form.ChildAge) e.ChildAge = "Select child's age";
    if (form.ServiceType === "Baby Caretaker" && form.ChildDuties.length === 0) e.ChildDuties = "Select at least one duty";
    if (form.ServiceType === "Patient Care" && !form.PatientAge.trim()) e.PatientAge = "Patient age is required";
    if (form.ServiceType === "Patient Care" && form.CareNeeded.length === 0) e.CareNeeded = "Select at least one care type";
    if (form.ServiceType === "Driver" && form.VehicleType.length === 0) e.VehicleType = "Select at least one vehicle type";
    if (form.ServiceType === "Japa" && form.JapaDuties.length === 0) e.JapaDuties = "Select at least one Japa duty";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleNopayDirectSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setStatus(null);
    try {
      const zohoFields = buildZohoFields({
        ...form,
        PlanType: "Priority",
        PaymentStatus: "Paid"
      });
      await axios.post(`${API_BASE$1}/submit-nopay`, { zohoFields });
      setForm({ ...INIT });
      navigate("/thank-you", { state: { fromForm: "demand" } });
    } catch (err) {
      setStatus("error");
      setStatusMsg(
        err?.response?.data?.error || "Something went wrong. Please try again or call us on +91 92112 98139."
      );
    }
    setSubmitting(false);
  };
  const svc = form.ServiceType;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SEO, { title: "Demand Form", description: "", noIndex: true }),
    /* @__PURE__ */ jsx("div", { style: s.page, children: /* @__PURE__ */ jsxs("div", { style: s.card, children: [
      /* @__PURE__ */ jsxs("div", { style: s.header, children: [
        /* @__PURE__ */ jsx("div", { style: s.logoBox, children: /* @__PURE__ */ jsx("img", { src: "./logoOnly.webp", alt: "Domestic Pro logo" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { style: s.headerTitle, children: "DomesticPro – 24×7 Live-In Helper" }),
          /* @__PURE__ */ jsx("p", { style: s.headerTitle, children: "Demand Request Form" }),
          /* @__PURE__ */ jsx("p", { style: s.headerSub, children: "Fill in your details and we'll match you with the right helper within 2 hours." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: s.body, children: [
        /* @__PURE__ */ jsx(SectionBar, { children: "Personal Details" }),
        /* @__PURE__ */ jsxs("div", { style: s.row2, children: [
          /* @__PURE__ */ jsxs("div", { style: s.field, children: [
            /* @__PURE__ */ jsxs("label", { style: s.label, children: [
              "First Name",
              /* @__PURE__ */ jsx("span", { style: s.req, children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: form.FirstName,
                onChange: (e) => setF("FirstName", e.target.value),
                placeholder: "Rahul",
                style: s.input
              }
            ),
            /* @__PURE__ */ jsx(Err, { msg: errors.FirstName })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: s.field, children: [
            /* @__PURE__ */ jsx("label", { style: s.label, children: "Last Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: form.LastName,
                onChange: (e) => setF("LastName", e.target.value),
                placeholder: "Sharma",
                style: s.input
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: s.field, children: [
          /* @__PURE__ */ jsxs("label", { style: s.label, children: [
            "Phone Number",
            /* @__PURE__ */ jsx("span", { style: s.req, children: "*" })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: s.phoneWrap, children: [
            /* @__PURE__ */ jsx("span", { style: s.phonePrefix, children: "+91" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "tel",
                inputMode: "numeric",
                maxLength: 10,
                value: form.Phone,
                onChange: (e) => setF("Phone", e.target.value.replace(/\D/g, "").slice(0, 10)),
                placeholder: "98765 43210",
                style: s.phoneInput
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Err, { msg: errors.Phone })
        ] }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            label: "Email Address",
            type: "email",
            value: form.Email,
            onChange: (e) => setF("Email", e.target.value),
            placeholder: "rahul@example.com"
          }
        ),
        /* @__PURE__ */ jsxs("div", { style: s.field, children: [
          /* @__PURE__ */ jsxs("label", { style: s.label, children: [
            "Current Address",
            /* @__PURE__ */ jsx("span", { style: s.req, children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: form.Street,
              onChange: (e) => setF("Street", e.target.value),
              placeholder: "Street Address",
              style: { ...s.input, marginBottom: 8 }
            }
          ),
          /* @__PURE__ */ jsx(Err, { msg: errors.Street }),
          /* @__PURE__ */ jsxs("div", { style: s.row2, children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: form.City,
                  onChange: (e) => setF("City", e.target.value),
                  placeholder: "City",
                  style: s.input
                }
              ),
              /* @__PURE__ */ jsx(Err, { msg: errors.City })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "State / Province",
                style: s.input
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(SectionBar, { children: "Service Details" }),
        /* @__PURE__ */ jsxs("div", { style: s.field, children: [
          /* @__PURE__ */ jsxs("label", { style: s.label, children: [
            "Which type of household help are you looking for?",
            /* @__PURE__ */ jsx("span", { style: s.req, children: "*" })
          ] }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: form.ServiceType,
              onChange: (e) => setF("ServiceType", e.target.value),
              style: s.select,
              children: [
                /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Please Select" }),
                SERVICE_TYPES.map((o) => /* @__PURE__ */ jsx("option", { value: o, children: o }, o))
              ]
            }
          ),
          /* @__PURE__ */ jsx(Err, { msg: errors.ServiceType })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: s.field, children: [
          /* @__PURE__ */ jsxs("label", { style: s.label, children: [
            "Work Type",
            /* @__PURE__ */ jsx("span", { style: s.req, children: "*" })
          ] }),
          /* @__PURE__ */ jsx("div", { style: s.radioRow, children: SERVICE_FORMATS.map((o) => /* @__PURE__ */ jsxs("label", { style: s.radioLabel, children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "radio",
                style: s.radioInput,
                name: "workType",
                checked: form.ServiceFormat === o,
                onChange: () => setF("ServiceFormat", o)
              }
            ),
            o
          ] }, o)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: s.field, children: [
          /* @__PURE__ */ jsxs("label", { style: s.label, children: [
            "Helper's Gender Preference",
            /* @__PURE__ */ jsx("span", { style: s.req, children: "*" })
          ] }),
          /* @__PURE__ */ jsx("div", { style: s.radioRow, children: GENDER_OPTIONS.map((o) => /* @__PURE__ */ jsxs("label", { style: s.radioLabel, children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "radio",
                style: s.radioInput,
                name: "gender",
                checked: form.Cook_Gender === o,
                onChange: () => setF("Cook_Gender", o)
              }
            ),
            o
          ] }, o)) }),
          /* @__PURE__ */ jsx(Err, { msg: errors.Cook_Gender })
        ] }),
        svc === "Live-In Support" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(SectionBar, { children: "Live-In Support Details" }),
          /* @__PURE__ */ jsx(
            CheckboxGroup,
            {
              label: "Tasks Required",
              required: true,
              values: form.Tasks,
              onChange: (v) => toggleArr("Tasks", v),
              options: TASK_OPTIONS
            }
          ),
          /* @__PURE__ */ jsx(Err, { msg: errors.Tasks }),
          /* @__PURE__ */ jsxs("div", { style: s.field, children: [
            /* @__PURE__ */ jsx("label", { style: s.label, children: "House Size" }),
            /* @__PURE__ */ jsxs("select", { value: form.HouseSize, onChange: (e) => setF("HouseSize", e.target.value), style: s.select, children: [
              /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Select…" }),
              HOUSE_SIZE_OPTIONS.map((o) => /* @__PURE__ */ jsx("option", { value: o, children: o }, o))
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: s.field, children: [
            /* @__PURE__ */ jsx("label", { style: s.label, children: "People at Home" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: form.PeopleAtHome,
                onChange: (e) => setF("PeopleAtHome", e.target.value),
                placeholder: "e.g. 4",
                style: s.input,
                min: "1"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { style: s.field, children: [
            /* @__PURE__ */ jsx("label", { style: s.label, children: "Pets at Home" }),
            /* @__PURE__ */ jsx("div", { style: s.radioRow, children: PETS_OPTIONS.map((o) => /* @__PURE__ */ jsxs("label", { style: s.radioLabel, children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "radio",
                  style: s.radioInput,
                  name: "pets",
                  checked: form.PetsAtHome === o,
                  onChange: () => setF("PetsAtHome", o)
                }
              ),
              o
            ] }, o)) })
          ] })
        ] }),
        svc === "Cooking Help" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(SectionBar, { children: "Cooking Help Details" }),
          /* @__PURE__ */ jsxs("div", { style: s.field, children: [
            /* @__PURE__ */ jsx("label", { style: s.label, children: "Meal Preference" }),
            /* @__PURE__ */ jsx("div", { style: s.radioRow, children: MEAL_PREF_OPTIONS.map((o) => /* @__PURE__ */ jsxs("label", { style: s.radioLabel, children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "radio",
                  style: s.radioInput,
                  name: "mealPref",
                  checked: form.MealPref === o,
                  onChange: () => setF("MealPref", o)
                }
              ),
              o
            ] }, o)) })
          ] }),
          /* @__PURE__ */ jsx(
            CheckboxGroup,
            {
              label: "Cuisine Preference",
              required: true,
              values: form.CuisinePref,
              onChange: (v) => toggleArr("CuisinePref", v),
              options: CUISINE_OPTIONS
            }
          ),
          /* @__PURE__ */ jsx(Err, { msg: errors.CuisinePref }),
          /* @__PURE__ */ jsxs("div", { style: s.field, children: [
            /* @__PURE__ */ jsx("label", { style: s.label, children: "Members to Cook For" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: form.Cook_Members,
                onChange: (e) => setF("Cook_Members", e.target.value),
                placeholder: "e.g. 4",
                style: s.input,
                min: "1"
              }
            )
          ] })
        ] }),
        svc === "Baby Caretaker" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(SectionBar, { children: "Baby Caretaker Details" }),
          /* @__PURE__ */ jsxs("div", { style: s.field, children: [
            /* @__PURE__ */ jsxs("label", { style: s.label, children: [
              "Age Groups Handled (in years)",
              /* @__PURE__ */ jsx("span", { style: s.req, children: "*" })
            ] }),
            CHILD_AGE_OPTIONS.map((o) => /* @__PURE__ */ jsxs("label", { style: s.radioLabel, children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "radio",
                  style: s.radioInput,
                  name: "ChildAge",
                  checked: form.ChildAge === o,
                  onChange: () => setF("ChildAge", o)
                }
              ),
              o
            ] }, o)),
            /* @__PURE__ */ jsx(Err, { msg: errors.ChildAge })
          ] }),
          /* @__PURE__ */ jsx(
            CheckboxGroup,
            {
              label: "Skills / Tasks Can Perform",
              required: true,
              values: form.ChildDuties,
              onChange: (v) => toggleArr("ChildDuties", v),
              options: CHILD_DUTY_OPTIONS
            }
          ),
          /* @__PURE__ */ jsx(Err, { msg: errors.ChildDuties })
        ] }),
        svc === "Patient Care" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(SectionBar, { children: "Patient Care Details" }),
          /* @__PURE__ */ jsxs("div", { style: s.field, children: [
            /* @__PURE__ */ jsxs("label", { style: s.label, children: [
              "Patient's Age",
              /* @__PURE__ */ jsx("span", { style: s.req, children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: form.PatientAge,
                onChange: (e) => setF("PatientAge", e.target.value),
                placeholder: "e.g. 68",
                style: s.input,
                min: "1"
              }
            ),
            /* @__PURE__ */ jsx(Err, { msg: errors.PatientAge })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: s.field, children: [
            /* @__PURE__ */ jsx("label", { style: s.label, children: "Patient's Gender" }),
            /* @__PURE__ */ jsx("div", { style: s.radioRow, children: PATIENT_GENDER_OPTIONS.map((o) => /* @__PURE__ */ jsxs("label", { style: s.radioLabel, children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "radio",
                  style: s.radioInput,
                  name: "patientGender",
                  checked: form.PatientGender === o,
                  onChange: () => setF("PatientGender", o)
                }
              ),
              o
            ] }, o)) })
          ] }),
          /* @__PURE__ */ jsx(
            CheckboxGroup,
            {
              label: "Care Required",
              required: true,
              values: form.CareNeeded,
              onChange: (v) => toggleArr("CareNeeded", v),
              options: CARE_NEEDED_OPTIONS
            }
          ),
          /* @__PURE__ */ jsx(Err, { msg: errors.CareNeeded })
        ] }),
        svc === "Driver" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(SectionBar, { children: "Driver Details" }),
          /* @__PURE__ */ jsx(
            CheckboxGroup,
            {
              label: "Vehicle Type(s)",
              required: true,
              values: form.VehicleType,
              onChange: (v) => toggleArr("VehicleType", v),
              options: VEHICLE_TYPE_OPTIONS
            }
          ),
          /* @__PURE__ */ jsx(Err, { msg: errors.VehicleType })
        ] }),
        svc === "Japa" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(SectionBar, { children: "Japa Details" }),
          /* @__PURE__ */ jsxs("div", { style: s.field, children: [
            /* @__PURE__ */ jsx("label", { style: s.label, children: "Newborn's Age (weeks)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: form.NewbornAge,
                onChange: (e) => setF("NewbornAge", e.target.value),
                placeholder: "e.g. 2 weeks",
                style: s.input
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            CheckboxGroup,
            {
              label: "Japa Duties (Newborn)",
              required: true,
              values: form.JapaDuties,
              onChange: (v) => toggleArr("JapaDuties", v),
              options: JAPA_DUTY_OPTIONS
            }
          ),
          /* @__PURE__ */ jsx(Err, { msg: errors.JapaDuties }),
          /* @__PURE__ */ jsx(
            CheckboxGroup,
            {
              label: "Mother's Needs",
              values: form.JapaMotherNeeds,
              onChange: (v) => toggleArr("JapaMotherNeeds", v),
              options: JAPA_MOTHER_OPTIONS
            }
          )
        ] }),
        /* @__PURE__ */ jsx(SectionBar, { children: "Preferences & Plan" }),
        /* @__PURE__ */ jsxs("div", { style: s.field, children: [
          /* @__PURE__ */ jsxs("label", { style: s.label, children: [
            "Urgency",
            /* @__PURE__ */ jsx("span", { style: s.req, children: "*" })
          ] }),
          /* @__PURE__ */ jsxs("select", { value: form.Urgency, onChange: (e) => setF("Urgency", e.target.value), style: s.select, children: [
            /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "How soon?" }),
            URGENCY_OPTIONS.map((o) => /* @__PURE__ */ jsx("option", { value: o, children: o }, o))
          ] }),
          /* @__PURE__ */ jsx(Err, { msg: errors.Urgency })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: s.field, children: [
          /* @__PURE__ */ jsxs("label", { style: s.label, children: [
            "Monthly Budget",
            /* @__PURE__ */ jsx("span", { style: s.req, children: "*" })
          ] }),
          /* @__PURE__ */ jsxs("select", { value: form.Budget, onChange: (e) => setF("Budget", e.target.value), style: s.select, children: [
            /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Select budget…" }),
            BUDGET_OPTIONS.map((o) => /* @__PURE__ */ jsx("option", { value: o, children: o }, o))
          ] }),
          /* @__PURE__ */ jsx(Err, { msg: errors.Budget })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: s.field, children: [
          /* @__PURE__ */ jsx("label", { style: s.label, children: "Special Instructions" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 3,
              maxLength: 500,
              value: form.Instructions,
              onChange: (e) => setF("Instructions", e.target.value),
              placeholder: "Specific timing, language preferences, dietary restrictions, any other requirements…",
              style: s.textarea
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleNopayDirectSubmit,
            disabled: submitting,
            style: submitting ? s.submitBtnDisabled : s.submitBtn,
            children: "Submit Request →"
          }
        ),
        status === "success" && /* @__PURE__ */ jsxs("div", { style: s.successBanner, children: [
          "✓ ",
          statusMsg
        ] }),
        status === "error" && /* @__PURE__ */ jsxs("div", { style: s.errorBanner, children: [
          "⚠ ",
          statusMsg
        ] })
      ] })
    ] }) })
  ] });
}
const CONFIG = {
  demand: {
    formType: "Demand Request",
    title: "Request submitted successfully.",
    desc: [
      "Your request has been received. We are already finding the best-matched helper profiles for you.",
      "You will receive verified helper profiles directly on your WhatsApp within 10 min — keep an eye on your messages."
    ]
  },
  supply: {
    formType: "Helper Registration",
    title: "Profile submitted successfully.",
    desc: [
      "The helper profile has been created successfully.",
      "Our coordination team will verify the details and reach out shortly."
    ],
    primaryLabel: "Add Another Helper",
    primaryPath: "/supply-form"
  },
  agent: {
    formType: "Agent Onboarding",
    title: "Welcome to the Referral Program.",
    desc: [
      "You are now a registered DomesticPro agent. Your unique Agent Code will be shared with you on WhatsApp shortly.",
      "Share candidate details with us by using the button below and we will keep you updated at every stage — from profile to placement. Your referral payout will be transferred automatically once a booking is confirmed."
    ],
    primaryLabel: "Submit a Helper Profile",
    primaryPath: "/supply-form"
  }
};
const SuccessMark = () => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: "52",
    height: "52",
    viewBox: "0 0 52 52",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    children: [
      /* @__PURE__ */ jsx("rect", { width: "52", height: "52", rx: "12", fill: "#EC5F36" }),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M15 26.5L22.5 34L37 19",
          stroke: "#ffffff",
          strokeWidth: "3",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    ]
  }
);
const ArrowRight = () => /* @__PURE__ */ jsx("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M2.5 7H11.5M11.5 7L7.5 3M11.5 7L7.5 11", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
const PhoneSVG = () => /* @__PURE__ */ jsx("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "#9CA3AF", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.9 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012.81 1h3a2 2 0 012 1.72c.13.96.36 1.9.68 2.81a2 2 0 01-.45 2.11L6.91 8.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.8 12.8 0 002.81.68A2 2 0 0122 16.92z" }) });
function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const formType = location.state?.fromForm;
  useEffect(() => {
    if (!formType || !CONFIG[formType]) {
      navigate("/demand-form", { replace: true });
    }
  }, [formType, navigate]);
  if (!formType || !CONFIG[formType]) return null;
  const cfg = CONFIG[formType];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("style", { children: `

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --brand:      #EC5F36;
          --brand-dark: #C94D27;
          --ink:        #111827;
          --ink-mid:    #374151;
          --ink-light:  #6B7280;
          --ink-muted:  #9CA3AF;
          --rule:       #E5E7EB;
          --surface:    #ffffff;
          --page-bg:    #F3F4F6;
          --tag-bg:     #FEF3EE;
          --tag-border: #FCDCC9;
          --tag-text:   #C24A1E;
          --radius-sm:  4px;
          --radius-md:  8px;
          --radius-lg:  12px;
        }

        body { background: var(--page-bg); }

        /* ── PAGE ── */
        .ty-page {
          min-height: 100vh;
          background: var(--page-bg);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px 16px 25px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        /* ── CARD ── */
        .ty-card {
          width: 100%;
          max-width: 492px;
          background: var(--surface);
          border: 1px solid #E5E7EB;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.05);
          opacity: 0;
          transform: translateY(10px);
          animation: reveal .38s ease forwards;
        }
        @keyframes reveal {
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── HEADER ── */
        .ty-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 28px;
          border-bottom: 1px solid var(--rule);
          gap: 12px;
        }
        .ty-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }
        .ty-logo {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          object-fit: contain;
        }
        .ty-brand {
          font-size: 14px;
          font-weight: 700;
          color: var(--ink);
          letter-spacing: -0.02em;
          line-height: 1.25;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ty-brand-tagline {
          font-size: 11.5px;
          font-weight: 400;
          color: var(--ink-muted);
          margin-top: 1px;
        }
        .ty-form-tag {
          flex-shrink: 0;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--tag-text);
          background: var(--tag-bg);
          border: 1px solid var(--tag-border);
          border-radius: var(--radius-sm);
          padding: 4px 9px;
          white-space: nowrap;
        }

        /* ── BODY ── */
        .ty-body {
          padding: 36px 28px 32px;
        }

        /* ── SUCCESS MARK + LABEL ROW ── */
        .ty-success-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 28px;
        }
        .ty-success-text-group { display: flex; flex-direction: column; gap: 3px; }
        .ty-submitted-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--brand);
        }
        .ty-submitted-time {
          font-size: 12px;
          color: var(--ink-muted);
          font-weight: 400;
        }

        /* ── TITLE ── */
        .ty-title {
          font-size: 22px;
          font-weight: 700;
          color: var(--ink);
          letter-spacing: -0.03em;
          line-height: 1.3;
          margin-bottom: 16px;
        }

        /* ── DESC ── */
        .ty-desc {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 32px;
        }
        .ty-desc p {
          font-size: 14px;
          font-weight: 400;
          line-height: 1.72;
          color: var(--ink-mid);
        }

        /* ── RULE ── */
        .ty-rule {
          height: 1px;
          background: var(--rule);
          margin-bottom: 24px;
        }

        /* ── BUTTONS ── */
        .ty-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .ty-btn-p {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 12px 20px;
          background: var(--brand);
          color: #fff;
          border: none;
          border-radius: var(--radius-md);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.01em;
          cursor: pointer;
          transition: background .16s ease, box-shadow .16s ease;
          box-shadow: 0 1px 2px rgba(236,95,54,.2);
        }
        .ty-btn-p:hover {
          background: var(--brand-dark);
          box-shadow: 0 3px 10px rgba(236,95,54,.3);
        }
        .ty-btn-p:active { transform: translateY(1px); }

        .ty-btn-s {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 11px 20px;
          background: transparent;
          color: var(--ink-mid);
          border: 1px solid #D1D5DB;
          border-radius: var(--radius-md);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.01em;
          cursor: pointer;
          transition: border-color .16s, background .16s, color .16s;
        }
        .ty-btn-s:hover {
          border-color: var(--brand);
          color: var(--brand);
          background: var(--tag-bg);
        }

        /* ── FOOTER ── */
        .ty-footer {
          padding: 14px 28px;
          border-top: 1px solid var(--rule);
          background: #FAFAFA;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }
        .ty-footer-support {
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .ty-footer-support span {
          font-size: 12px;
          color: var(--ink-muted);
        }
        .ty-footer-support a {
          font-size: 12px;
          font-weight: 600;
          color: var(--ink);
          text-decoration: none;
        }
        .ty-footer-support a:hover { color: var(--brand); }
        .ty-footer-brand {
          font-size: 11px;
          color: #D1D5DB;
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        @media (max-width: 480px) {
          .ty-body     { padding: 28px 20px 24px; }
          .ty-header   { padding: 16px 20px; }
          .ty-footer   { padding: 12px 20px; }
          .ty-title    { font-size: 19px; }
          .ty-brand    { font-size: 13px; }
        }
      ` }),
    /* @__PURE__ */ jsx("div", { className: "ty-page", children: /* @__PURE__ */ jsxs("div", { className: "ty-card", children: [
      /* @__PURE__ */ jsxs("div", { className: "ty-header", children: [
        /* @__PURE__ */ jsxs("div", { className: "ty-header-left", children: [
          /* @__PURE__ */ jsx("img", { src: "./logoOnly.webp", alt: "DomesticPro", className: "ty-logo" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "ty-brand", children: "DomesticPro" }),
            /* @__PURE__ */ jsx("div", { className: "ty-brand-tagline", children: "24×7 Live-In Helper Service" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "ty-form-tag", children: cfg.formType })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ty-body", children: [
        /* @__PURE__ */ jsxs("div", { className: "ty-success-row", children: [
          /* @__PURE__ */ jsx(SuccessMark, {}),
          /* @__PURE__ */ jsxs("div", { className: "ty-success-text-group", children: [
            /* @__PURE__ */ jsx("span", { className: "ty-submitted-label", children: "Submission confirmed" }),
            /* @__PURE__ */ jsx("span", { className: "ty-submitted-time", children: (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric"
            }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "ty-title", children: cfg.title }),
        /* @__PURE__ */ jsx("div", { className: "ty-desc", children: cfg.desc.map((para, i) => /* @__PURE__ */ jsx("p", { children: para }, i)) }),
        /* @__PURE__ */ jsx("div", { className: "ty-rule" }),
        /* @__PURE__ */ jsx("div", { className: "ty-actions", children: /* @__PURE__ */ jsxs("button", { className: "ty-btn-p", onClick: () => navigate(cfg.primaryPath), children: [
          cfg.primaryLabel,
          " ",
          /* @__PURE__ */ jsx(ArrowRight, {})
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ty-footer", children: [
        /* @__PURE__ */ jsxs("div", { className: "ty-footer-support", children: [
          /* @__PURE__ */ jsx(PhoneSVG, {}),
          /* @__PURE__ */ jsx("span", { children: "Need help? " }),
          /* @__PURE__ */ jsx("a", { href: "tel:+919211298139", children: "+91 92112 98139" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "ty-footer-brand", children: "domesticpro.in" })
      ] })
    ] }) })
  ] });
}
const API_BASE = "http://localhost:8000";
const MAX_POLLS = 10;
const PLAN_CONFIG = {
  priority: {
    label: "Priority Plan",
    color: "#EC5F36",
    accentBg: "#FFF2EE",
    accentBorder: "#F5D8CF",
    accentText: "#EC5F36",
    successTitle: "Payment Successful! 🚀",
    successSub: "Your Priority request is now active. We're fast-tracking your requirement.",
    steps: [
      { dot: "bg-orange-500", label: "Our team reviews your requirement immediately" },
      { dot: "bg-orange-400", label: "3 verified profiles shortlisted" },
      { dot: "bg-orange-300", label: "Profiles shared within 24 hours" }
    ]
  },
  commitment: {
    label: "Commitment Plan",
    color: "#3B82F6",
    accentBg: "#EFF6FF",
    accentBorder: "#BFDBFE",
    accentText: "#3B82F6",
    successTitle: "Payment Confirmed! 🎉",
    successSub: "Your Commitment plan is active. We'll begin shortlisting your profiles.",
    steps: [
      { dot: "bg-blue-500", label: "Our team reviews your requirement" },
      { dot: "bg-blue-400", label: "2 verified profiles shortlisted" },
      { dot: "bg-blue-300", label: "Profiles shared within 2 working days" }
    ]
  }
};
function PaymentStatus() {
  const [status, setStatus] = useState("loading");
  const [orderId, setOrderId] = useState("");
  const [pollCount, setPollCount] = useState(0);
  const [plan, setPlan] = useState("priority");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oid = params.get("order_id") || sessionStorage.getItem("dp_order_id") || "";
    const savedPlan = sessionStorage.getItem("dp_plan") || "priority";
    setOrderId(oid);
    setPlan(savedPlan);
    if (!oid) {
      setStatus("error");
      return;
    }
    const alreadyPaid = sessionStorage.getItem("dp_payment_done");
    if (alreadyPaid === oid) {
      console.log("[VERIFY] Already confirmed paid — skipping verify call");
      setStatus("paid");
      return;
    }
    verify(oid, 0, savedPlan);
  }, []);
  const verify = async (oid, attempt, savedPlan) => {
    try {
      const res = await fetch(`${API_BASE}/payment-verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: oid, plan: savedPlan })
      });
      const data = await res.json();
      if (data.status === "PAID") {
        sessionStorage.setItem("dp_payment_done", oid);
        sessionStorage.removeItem("dp_order_id");
        sessionStorage.removeItem("dp_plan");
        sessionStorage.removeItem("dp_customer_phone");
        sessionStorage.removeItem("dp_drop_lead_id");
        setStatus("paid");
        return;
      }
      if (data.status === "ACTIVE" && attempt < MAX_POLLS) {
        setPollCount(attempt + 1);
        setTimeout(() => verify(oid, attempt + 1, savedPlan), 3e3);
        return;
      }
      if (attempt >= MAX_POLLS && data.status === "ACTIVE") {
        setStatus("pending");
        return;
      }
      setStatus("failed");
    } catch (err) {
      console.error("[VERIFY] Network error:", err.message);
      if (attempt < MAX_POLLS) {
        setTimeout(() => verify(oid, attempt + 1, savedPlan), 3e3);
      } else {
        setStatus("error");
      }
    }
  };
  const pc = PLAN_CONFIG[plan] || PLAN_CONFIG.priority;
  const stripColor = {
    loading: plan === "commitment" ? "bg-blue-400" : "bg-orange-500",
    paid: "bg-green-400",
    failed: "bg-red-400",
    pending: "bg-amber-400",
    error: "bg-gray-300"
  }[status];
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "min-h-screen bg-gray-50 flex items-center justify-center p-4",
      style: { fontFamily: "'Plus Jakarta Sans', sans-serif" },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 pointer-events-none overflow-hidden", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full",
              style: { background: `${pc.color}0D` }
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute -bottom-28 -left-28 w-[360px] h-[360px] rounded-full",
              style: { background: `${pc.color}08` }
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "anim-status-enter relative w-full max-w-sm",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden", children: [
                /* @__PURE__ */ jsx("div", { className: `h-1 w-full ${stripColor}` }),
                /* @__PURE__ */ jsxs("div", { className: "px-7 pt-7 pb-6 flex flex-col items-center text-center gap-5", children: [
                  status === "loading" && /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsxs("div", { className: "relative w-16 h-16", children: [
                      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full border-4 border-gray-100" }),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "absolute inset-0 rounded-full border-4 border-b-transparent border-l-transparent animate-spin",
                          style: { borderTopColor: pc.color, borderRightColor: pc.color }
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "absolute inset-3 rounded-full flex items-center justify-center",
                          style: { background: pc.accentBg },
                          children: plan === "commitment" ? /* @__PURE__ */ jsx(CalendarCheck, { size: 14, color: pc.color }) : /* @__PURE__ */ jsx(Zap, { size: 14, color: pc.color })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        "p",
                        {
                          className: "text-[10px] font-extrabold tracking-widest uppercase mb-2",
                          style: { color: pc.color },
                          children: pc.label
                        }
                      ),
                      /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-gray-900 mb-1.5", style: { fontFamily: "'Fraunces', serif" }, children: "Verifying payment…" }),
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 font-medium leading-relaxed", children: "Please wait. Do not close or refresh this tab." })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "flex gap-1.5 items-center", children: Array.from({ length: MAX_POLLS }).map((_, i) => /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "h-1.5 rounded-full transition-all duration-500",
                        style: { width: i < pollCount ? 16 : 6, background: i < pollCount ? pc.color : "#F1E3DE" }
                      },
                      i
                    )) }),
                    pollCount > 3 && /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-gray-400 font-medium", children: [
                      "Checking with Cashfree… (",
                      pollCount,
                      "/",
                      MAX_POLLS,
                      ")"
                    ] })
                  ] }),
                  status === "paid" && /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "anim-spring-pop w-16 h-16 rounded-full flex items-center justify-center",
                        style: { background: "#f0fdf4", boxShadow: "0 0 0 8px #bbf7d040" },
                        children: /* @__PURE__ */ jsx(CircleCheck, { size: 30, className: "text-green-500" })
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "anim-fade-up", style: { animationDelay: "0.15s" }, children: [
                      /* @__PURE__ */ jsxs(
                        "div",
                        {
                          className: "inline-flex items-center gap-1.5 text-[10px] font-extrabold tracking-widest uppercase rounded-full px-3 py-1 mb-3 border",
                          style: { background: pc.accentBg, borderColor: pc.accentBorder, color: pc.accentText },
                          children: [
                            plan === "commitment" ? /* @__PURE__ */ jsx(CalendarCheck, { size: 10 }) : /* @__PURE__ */ jsx(Zap, { size: 10 }),
                            pc.label
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-gray-900 mb-1", style: { fontFamily: "'Fraunces', serif" }, children: pc.successTitle }),
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 font-medium leading-relaxed", children: pc.successSub })
                    ] }),
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: "anim-fade-up w-full rounded-2xl p-4 text-left flex flex-col gap-3 border",
                        style: { animationDelay: "0.25s", background: pc.accentBg, borderColor: pc.accentBorder },
                        children: [
                          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-extrabold text-gray-400 tracking-widest uppercase", children: "What happens next" }),
                          pc.steps.map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
                            /* @__PURE__ */ jsx("div", { className: `w-2 h-2 rounded-full flex-shrink-0 ${item.dot}` }),
                            /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-gray-800", children: item.label })
                          ] }, i))
                        ]
                      }
                    ),
                    orderId && /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: "w-full rounded-xl px-4 py-2.5 flex items-center justify-between border",
                        style: { background: pc.accentBg, borderColor: pc.accentBorder },
                        children: [
                          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-extrabold text-gray-400 uppercase tracking-wider", children: "Order ID" }),
                          /* @__PURE__ */ jsx(
                            "span",
                            {
                              className: "text-[11px] font-extrabold truncate max-w-[180px]",
                              style: { color: pc.color },
                              children: orderId
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: "text-[11px] text-gray-400 font-medium", children: "You can safely close this tab. We'll call you shortly." })
                  ] }),
                  status === "failed" && /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "anim-spring-pop w-16 h-16 rounded-full bg-red-50 flex items-center justify-center",
                        style: { boxShadow: "0 0 0 8px #fee2e240" },
                        children: /* @__PURE__ */ jsx(CircleX, { size: 30, className: "text-red-400" })
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "anim-fade-up", style: { animationDelay: "0.15s" }, children: [
                      /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-gray-900 mb-1", style: { fontFamily: "'Fraunces', serif" }, children: "Payment Failed" }),
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 font-medium leading-relaxed", children: "No amount was deducted. Please try again." })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col gap-3", children: [
                      /* @__PURE__ */ jsxs("div", { className: "bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-xs text-red-600 font-medium leading-relaxed text-left", children: [
                        "Your ",
                        /* @__PURE__ */ jsx("strong", { children: pc.label }),
                        " request was not processed. No charges were applied."
                      ] }),
                      /* @__PURE__ */ jsxs(
                        "button",
                        {
                          onClick: () => {
                            sessionStorage.removeItem("dp_order_id");
                            window.history.back();
                          },
                          className: "w-full flex items-center justify-center gap-2 font-bold text-sm rounded-2xl py-3.5 text-white transition",
                          style: { background: "linear-gradient(135deg,#EC5F36,#D84E28)" },
                          children: [
                            /* @__PURE__ */ jsx(ArrowLeft, { size: 13 }),
                            "Go back & try again"
                          ]
                        }
                      )
                    ] })
                  ] }),
                  status === "pending" && /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "anim-spring-pop w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center",
                        style: { boxShadow: "0 0 0 8px #fef3c740" },
                        children: /* @__PURE__ */ jsx(Clock, { size: 28, className: "text-amber-400" })
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "anim-fade-up", style: { animationDelay: "0.15s" }, children: [
                      /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-gray-900 mb-1", style: { fontFamily: "'Fraunces', serif" }, children: "Payment Processing" }),
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 font-medium leading-relaxed", children: "Your bank is still confirming. This can take a few minutes." })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col gap-3", children: [
                      /* @__PURE__ */ jsxs("div", { className: "bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3 text-xs text-amber-700 font-medium leading-relaxed text-left", children: [
                        "If money was deducted, your ",
                        /* @__PURE__ */ jsx("strong", { children: pc.label }),
                        " request will be activated automatically. Our team will call you within 2 hours."
                      ] }),
                      orderId && /* @__PURE__ */ jsxs("div", { className: "w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 flex items-center justify-between", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-extrabold text-gray-400 uppercase tracking-wider", children: "Order ID" }),
                        /* @__PURE__ */ jsx("span", { className: "text-[11px] font-extrabold text-gray-800 truncate max-w-[180px]", children: orderId })
                      ] })
                    ] })
                  ] }),
                  status === "error" && /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "anim-spring-pop w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center",
                        style: { boxShadow: "0 0 0 8px #f3f4f640" },
                        children: /* @__PURE__ */ jsx(TriangleAlert, { size: 26, className: "text-gray-400" })
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "anim-fade-up", style: { animationDelay: "0.15s" }, children: [
                      /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-gray-900 mb-1", style: { fontFamily: "'Fraunces', serif" }, children: "Something went wrong" }),
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 font-medium leading-relaxed", children: "We couldn't verify your payment. Contact support if money was deducted." })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col gap-3", children: [
                      orderId && /* @__PURE__ */ jsxs("div", { className: "w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 flex items-center justify-between", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-extrabold text-gray-400 uppercase tracking-wider", children: "Order ID" }),
                        /* @__PURE__ */ jsx("span", { className: "text-[11px] font-extrabold text-gray-800 truncate max-w-[180px]", children: orderId })
                      ] }),
                      /* @__PURE__ */ jsxs(
                        "a",
                        {
                          href: `https://wa.me/919211298139?text=Payment+issue+%E2%80%93+${pc.label}+%E2%80%93+Order+ID:+${orderId}`,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          className: "w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-sm rounded-2xl py-3.5 transition hover:shadow-md",
                          children: [
                            /* @__PURE__ */ jsx(MessageSquare, { size: 14 }),
                            "WhatsApp Support"
                          ]
                        }
                      )
                    ] })
                  ] })
                ] }),
                ["failed", "pending", "error"].includes(status) && /* @__PURE__ */ jsx("div", { className: "px-7 pb-5 border-t border-gray-100 pt-4", children: /* @__PURE__ */ jsxs("p", { className: "text-center text-[10.5px] text-gray-400 font-medium", children: [
                  "Need help?",
                  " ",
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: "https://wa.me/919211298139",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "font-bold hover:underline",
                      style: { color: pc.color },
                      children: "Chat with us on WhatsApp"
                    }
                  )
                ] }) })
              ] }),
              /* @__PURE__ */ jsx(
                "p",
                {
                  className: "anim-fade-up text-center mt-5 text-[11px] font-bold text-gray-400 tracking-widest uppercase",
                  style: { animationDelay: "0.4s" },
                  children: "Domestic Pro · Secure Checkout"
                }
              )
            ]
          },
          status
        )
      ]
    }
  );
}
const AboutUs = lazy(() => import("./assets/AboutUs-udBBoC0D.js"));
const ContactPage = lazy(() => import("./assets/ContectNow-Cp4t08Jg.js"));
const Pricing = lazy(() => import("./assets/Pricing-CdyiIBGS.js"));
const ReferHelper = lazy(() => import("./assets/ReferAHelper-DzO-1717.js"));
const ReferHousehold = lazy(() => import("./assets/ReferAHousehold-BtgrbcDn.js"));
const Nanny = lazy(() => import("./assets/Nanny-ASbULnAg.js"));
const Cook = lazy(() => import("./assets/Cook-D1GSoMeI.js"));
const Driver = lazy(() => import("./assets/Driver-CwNUnF2G.js"));
const HouseHelp = lazy(() => import("./assets/HouseHelp-aJaV-PDC.js"));
const PatientCare = lazy(() => import("./assets/PatientCare-ChgaUTTl.js"));
const Japa = lazy(() => import("./assets/Japa-JDHPcjrO.js"));
const TermsAndCondition = lazy(() => import("./assets/TermsAndCondition-D3m2dSeN.js"));
const RefundPolicy = lazy(() => import("./assets/RefundPolicy-C-FXcmnK.js"));
const PrivacyPolicy = lazy(() => import("./assets/PrivacyPolicy-CI5zrNyz.js"));
const NotFound = lazy(() => import("./assets/NotFound-lKUUCm_O.js"));
function AppRoutes() {
  return /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Home, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/about", element: /* @__PURE__ */ jsx(AboutUs, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/contact", element: /* @__PURE__ */ jsx(ContactPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/pricing", element: /* @__PURE__ */ jsx(Pricing, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/refer-a-helper", element: /* @__PURE__ */ jsx(ReferHelper, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/refer-a-household", element: /* @__PURE__ */ jsx(ReferHousehold, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/services/baby-caretaker", element: /* @__PURE__ */ jsx(Nanny, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/services/cooking-help", element: /* @__PURE__ */ jsx(Cook, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/services/drivers", element: /* @__PURE__ */ jsx(Driver, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/services/japa", element: /* @__PURE__ */ jsx(Japa, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/services/live-in-support", element: /* @__PURE__ */ jsx(HouseHelp, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/services/patient-care", element: /* @__PURE__ */ jsx(PatientCare, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/terms-and-conditions", element: /* @__PURE__ */ jsx(TermsAndCondition, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/refund-policy", element: /* @__PURE__ */ jsx(RefundPolicy, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/privacy-policy", element: /* @__PURE__ */ jsx(PrivacyPolicy, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/demand-form", element: /* @__PURE__ */ jsx(DemandForm, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/agent-form", element: /* @__PURE__ */ jsx(AgentForm, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/supply-form", element: /* @__PURE__ */ jsx(SupplyForm, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/thank-you", element: /* @__PURE__ */ jsx(ThankYou, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/payment-status", element: /* @__PURE__ */ jsx(PaymentStatus, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
  ] }) });
}
function render(url) {
  const helmetContext = {};
  const html = ReactDOMServer.renderToString(
    /* @__PURE__ */ jsx(React4.StrictMode, { children: /* @__PURE__ */ jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(AppRoutes, {}) }) }) })
  );
  return { html, helmetContext };
}
export {
  HeroWizard as H,
  PricingSection as P,
  SEO as S,
  render,
  useScrollReveal as u
};
