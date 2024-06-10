import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import classNames from "classnames";
import Icon from "../../components/icon/Icon";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
const MenuHeading = ({ heading }) => {
  return (
    <li className="nk-menu-heading">
      <h6 className="overline-title text-primary-alt">{heading}</h6>
    </li>
  );
};

const MenuItem = ({
  icon,
  iconUrl,
  link,
  text,
  sub,
  newTab,
  sidebarToggle,
  mobileView,
  badge,
  id,
  ...props
}) => {
  let currentUrl;
  const toggleActionSidebar = (e) => {
    if (!sub && !newTab && mobileView) {
      sidebarToggle(e);
    }
  };

  if (window.location.pathname !== undefined) {
    currentUrl = window.location.pathname;
  } else {
    currentUrl = null;
  }

  const menuHeight = (el) => {
    var totalHeight = [];
    for (var i = 0; i < el.length; i++) {
      var margin =
        parseInt(window.getComputedStyle(el[i]).marginTop.slice(0, -2)) +
        parseInt(window.getComputedStyle(el[i]).marginBottom.slice(0, -2));
      var padding =
        parseInt(window.getComputedStyle(el[i]).paddingTop.slice(0, -2)) +
        parseInt(window.getComputedStyle(el[i]).paddingBottom.slice(0, -2));
      var height = el[i].clientHeight + margin + padding;
      totalHeight.push(height);
    }
    totalHeight = totalHeight.reduce((sum, value) => (sum += value));
    return totalHeight;
  };

  const makeParentActive = (el, childHeight) => {
    let element = el.parentElement.parentElement.parentElement;
    let wrap = el.parentElement.parentElement;
    if (element.classList[0] === "nk-menu-item") {
      element.classList.add("active");
      const subMenuHeight = menuHeight(el.parentNode.children);
      wrap.style.height = subMenuHeight + childHeight - 50 + "px";
      makeParentActive(element);
    }
  };

  useEffect(() => {
    var element = document.getElementsByClassName(
      "nk-menu-item active current-page"
    );
    var arrayElement = [...element];

    arrayElement.forEach((dom) => {
      if (
        dom.parentElement.parentElement.parentElement.classList[0] ===
        "nk-menu-item"
      ) {
        dom.parentElement.parentElement.parentElement.classList.add("active");
        const subMenuHeight = menuHeight(dom.parentNode.children);
        dom.parentElement.parentElement.style.height = subMenuHeight + "px";
        makeParentActive(
          dom.parentElement.parentElement.parentElement,
          subMenuHeight
        );
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const menuToggle = (e) => {
    e.preventDefault();
    var self = e.target.closest(".nk-menu-toggle");
    var parent = self.parentElement;
    var subMenu = self.nextSibling;
    var subMenuItem = subMenu.childNodes;
    var parentSiblings = parent.parentElement.childNodes;
    var parentMenu = parent.closest(".nk-menu-wrap");
    //For Sub Menu Height
    var subMenuHeight = menuHeight(subMenuItem);
    // Get parent elements
    const getParents = (el, parentSelector) => {
      parentSelector = document.querySelector(".nk-menu");
      if (parentSelector === undefined) {
        parentSelector = document;
      }
      var parents = [];
      var p = el.parentNode;
      while (p !== parentSelector) {
        var o = p;
        parents.push(o);
        p = o.parentNode;
      }
      parents.push(parentSelector);
      return parents;
    };
    var parentMenus = getParents(self);
    if (!parent.classList.contains("active")) {
      // For Parent Siblings
      for (var j = 0; j < parentSiblings.length; j++) {
        parentSiblings[j].classList?.remove("active");
        if (typeof parentSiblings[j].childNodes[1] !== "undefined") {
          parentSiblings[j].childNodes[1].style.height = 0;
        }
      }
      if (parentMenu !== null) {
        if (!parentMenu.classList.contains("sub-opened")) {
          parentMenu.classList.add("sub-opened");

          for (var l = 0; l < parentMenus.length; l++) {
            if (typeof parentMenus !== "undefined") {
              if (parentMenus[l].classList.contains("nk-menu-wrap")) {
                parentMenus[l].style.height =
                  subMenuHeight + parentMenus[l].clientHeight + "px";
              }
            }
          }
        }
      }
      // For Current Element
      parent.classList.add("active");
      subMenu.style.height = subMenuHeight + "px";
    } else {
      parent.classList.remove("active");
      if (parentMenu !== null) {
        parentMenu.classList.remove("sub-opened");
        for (var k = 0; k < parentMenus.length; k++) {
          if (typeof parentMenus !== "undefined") {
            if (parentMenus[k].classList.contains("nk-menu-wrap")) {
              parentMenus[k].style.height =
                parentMenus[k].clientHeight - subMenuHeight + "px";
            }
          }
        }
      }
      subMenu.style.height = 0;
    }
  };

  const menuItemClass = classNames({
    "nk-menu-item": true,
    "has-sub": sub,
    "active current-page": currentUrl === process.env.PUBLIC_URL + link,
  });
  const { setWorkspaceData } = useContext(UserContext);

  const handleClick = (e) => {
    toggleActionSidebar(e);
    if (id) {
      localStorage.setItem("workspace_name", text);
      localStorage.setItem("workspace_id", id);
      setWorkspaceData({ workspace_name: text, workspace_id: id });
    }
  };

  return (
    <li className={menuItemClass} onClick={handleClick}>
      {newTab ? (
        <Link
          to={`${process.env.PUBLIC_URL + link}`}
          target="_blank"
          rel="noopener noreferrer"
          className="nk-menu-link"
        >
          {icon ? (
            <span className="nk-menu-icon">
              {iconUrl ? <img src={iconUrl}></img> : <Icon name={icon} />}
            </span>
          ) : null}
          <span className="nk-menu-text">{text}</span>
        </Link>
      ) : (
        <NavLink
          to={`${process.env.PUBLIC_URL + link}`}
          className={`nk-menu-link${sub ? " nk-menu-toggle" : ""}`}
          onClick={sub ? menuToggle : null}
        >
          {icon ? (
            <span style={{ fontSize: "22px", marginRight: "2px" }}>
              {iconUrl ? <img src={iconUrl}></img> : <Icon name={icon} />}
              {/*  */}
            </span>
          ) : null}
          <span className="nk-menu-text">{text}</span>
          {badge && <span className="nk-menu-badge">{badge}</span>}
        </NavLink>
      )}
      {sub ? (
        <div className="nk-menu-wrap">
          <MenuSub
            sub={sub}
            sidebarToggle={sidebarToggle}
            mobileView={mobileView}
          />
        </div>
      ) : null}
    </li>
  );
};
const MenuSub = ({
  icon,
  link,
  text,
  sub,
  sidebarToggle,
  mobileView,
  ...props
}) => {
  return (
    <ul className="nk-menu-sub" style={props.style}>
      {sub.map((item) => (
        <MenuItem
          link={item.link}
          icon={item.icon}
          iconUrl={item.iconUrl}
          text={item.text}
          sub={item.subMenu}
          key={item.text}
          newTab={item.newTab}
          badge={item.badge}
          sidebarToggle={sidebarToggle}
          mobileView={mobileView}
          id={item.id}
        />
      ))}
    </ul>
  );
};
const Menu = ({ sidebarToggle, mobileView }) => {
  const { menuData, userAuthContextData } = useContext(AuthContext);
  menuData.splice(6);
  const [userDataguest] = userAuthContextData;
  const [workspacelist, setWorkspacelist] = useState([]);
  let token = localStorage.getItem("token") || "";
  const { setWorkspaceData, isLogin } = useContext(UserContext);
  useEffect(() => {
    const config = {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };
    axios
      .post(`${process.env.REACT_APP_API_URL_LOCAL}/getworkspace`, {}, config)
      .then((response) => {
        let myData = response?.data?.data[0];
        setWorkspaceData({
          workspace_id: myData.id,
          workspace_name: myData?.workspace_name,
        });
        setWorkspacelist(response.data.data);
      })
      .catch((error) => {});
  }, []);
  // const subMenu = workspacelist
  //   ?.map((data) => {
  //     if (isLogin?.my_workspace?.includes(data.workspace_name)) {
  //       return {
  //         icon: "folders-fill",
  //         text: data.workspace_name,
  //         active: true,
  //         link: "/my-workspace",
  //         id: data.id,
  //       };
  //     }
  //     return null;
  //   })
  //   .filter(Boolean);
  // const teamMenu = workspacelist
  //   ?.map((data) => {
  //     if (isLogin?.teamspace?.includes(data.workspace_name)) {
  //       return {
  //         icon: "folders-fill",
  //         text: data.workspace_name,
  //         active: true,
  //         link: "/teamSpace",
  //         id: data.id,
  //       };
  //     }
  //     return null;
  //   })
  //   .filter(Boolean);
  // const dataroomMenu = workspacelist
  // ?.map((data) => {
  //   if (isLogin?.teamspace?.includes(data.workspace_name)) {
  //     return {
  //       icon: "folders-fill",
  //       text: data.workspace_name,
  //       active: true,
  //       link: "/teamSpace",
  //       id: data.id,
  //     };
  //   }
  //   return null;
  // })
  // .filter(Boolean);
  // new
  const subMenu = workspacelist
    ?.filter((data) => data.workspace_type === "My Workspace")
    .map((data) => ({
      icon: "folders-fill",
      text: data.workspace_name,
      active: true,
      link: "/my-workspace",
      id: data.id,
    }));
  const teamMenu = workspacelist
    ?.filter((data) => data.workspace_type === "TeamSpace")
    .map((data) => ({
      icon: "folders-fill",
      text: data.workspace_name,
      active: true,
      link: "/teamSpace",
      id: data.id,
    }));
  const dataroomMenu = workspacelist
    ?.filter((data) => data.workspace_type === "Data Room")
    .map((data) => ({
      icon: "folders-fill",
      text: data.workspace_name,
      active: true,
      link: "/dataRoom",
      id: data.id,
    }));
  let workSpaceMenu = [
    {
      icon: "growth-fill",
      text: "Dashboard",
      active: true,
      link: "/",
    },
    {
      icon: "google-wallet",
      text: "My Workspace",
      active: true,
      link: "/workspace-data",
      subMenu: subMenu,
    },
    {
      icon: "share-fill",
      text: "TeamSpace",
      active: true,
      link: "/teamSpace",
      subMenu: teamMenu,
    },
    {
      icon: "slack",
      text: "Data Room",
      active: true,
      link: "/dataRoom",
      subMenu: dataroomMenu,
    },
  ];
  let loginData = {};
  const property = isLogin?.Permission?.map((data) => {
    loginData = data;
  });
  if (loginData?.recycle_bin === "true") {
    workSpaceMenu.push({
      icon: "trash-fill",
      text: "Recycle bin",
      active: true,
      link: "/recyclebin",
    });
  }

  return (
    <ul className="nk-menu">
      {workSpaceMenu.map((item) =>
        item.heading ? (
          <MenuHeading heading={item.heading} key={item.heading} />
        ) : userDataguest.type === "guest" ? (
          ""
        ) : (
          <MenuItem
            key={item.text}
            link={item.link}
            icon={item.icon}
            iconUrl={item.iconUrl}
            text={item.text}
            sub={item.subMenu}
            badge={item.badge}
            sidebarToggle={sidebarToggle}
            mobileView={mobileView}
          />
        )
      )}
      {menuData.map((item) =>
        item.heading ? (
          <MenuHeading heading={item.heading} key={item.heading} />
        ) : (
          <MenuItem
            key={item.text}
            link={item.link}
            icon={item.icon}
            iconUrl={item.iconUrl}
            text={item.text}
            sub={item.subMenu}
            badge={item.badge}
            sidebarToggle={sidebarToggle}
            mobileView={mobileView}
          />
        )
      )}
    </ul>
  );
};

export default Menu;
