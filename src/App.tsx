import { Fragment, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Button, clsx, Group, Stack, UnstyledButton } from "@mantine/core";
import { Children } from "react";
const SWITCH_ON = <Icon icon="line-md:switch-off-to-switch-transition" />;
const SWITCH_OFF = <Icon icon="line-md:switch-to-switch-off-transition" />;

const MENU: Array<
  {
    label: string;
    icon: string;
  } & Partial<{
    children?: Array<string>;
    visible: boolean;
  }>
> = [
  {
    label: "Admin Dashboard",
    icon: "bi:house-heart",
  },
  {
    label: "Registration",
    icon: "bx:calendar-check",
  },
  {
    label: "Patients",
    icon: "fa6-solid:paw",
  },
  {
    label: "Administration",
    icon: "ri:list-settings-line",
    children: ["Specialists", "Specialties, Schedules"],
    visible: false,
  },
  {
    label: "Pricing",
    icon: "ri:money-dollar-circle-line",
    children: ["Services", "Vaccines, Medicines"],
    visible: false,
  },
  {
    label: "Reception history",
    icon: "ri:history-line",
  },
  {
    label: "Report",
    icon: "octicon:graph-16",
  },
];
export default function App() {
  //   useEffect(() => {
  //     if (
  //       localStorage.theme === "dark" ||
  //       (!("theme" in localStorage) &&
  //         window.matchMedia("(prefers-color-scheme: dark)").matches)
  //     ) {
  //       document.documentElement.classList.add("dark");
  //     } else {
  //       document.documentElement.classList.remove("dark");
  //     }

  //     // Whenever the user explicitly chooses light mode
  //     localStorage.theme = "light";

  //     // Whenever the user explicitly chooses dark mode
  //     localStorage.theme = "dark";

  //     // Whenever the user explicitly chooses to respect the OS preference
  //     localStorage.removeItem("theme");
  //   }, []);
  const [subMenu, setSubMenu] = useState(
    Object.fromEntries(
      MENU.filter(({ visible }) => visible !== undefined).map(
        ({ label, visible }) => [label, visible]
      )
    )
  );
  return (
    <Stack>
      {MENU.map(({ label, icon, children }, idx) => {
        const visible = subMenu[label];
        return (
          <Fragment key={idx}>
            <UnstyledButton
              onClick={
                children
                  ? () => {
                      setSubMenu({ ...subMenu, [label]: !visible });
                    }
                  : undefined
              }
              className={clsx(
                "flex justify-between",
                visible
                  ? "text-light-turquoise font-semibold"
                  : "text-periwinkle"
              )}
            >
              <Group spacing="xs">
                <Icon icon={icon} />
                <span>{label}</span>
              </Group>
              {children ? (
                <Icon icon={visible ? "bx:caret-up" : "bx:caret-down"} />
              ) : null}
            </UnstyledButton>
            {children && visible
              ? children.map((item, idx) => (
                  <UnstyledButton key={idx} className="pl-9  text-periwinkle ">
                    {item}
                  </UnstyledButton>
                ))
              : null}
          </Fragment>
        );
      })}
    </Stack>
  );
}
