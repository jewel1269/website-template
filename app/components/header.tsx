import HeaderDefault from "@/components/(headers)/header-default";
import HeaderOne from "./(headers)/header-one/header-one";
import HeaderTwo from "./(headers)/header-two/header-two";
import HeaderThree from "./(headers)/header-three/header-three";
import HeaderFour from "./(headers)/header-four/header-four";
import HeaderFive from "./(headers)/header-five/header-five";

const Header = ({ theme, headerSetting, menu, navigation }: any) => {
  return (
    <>
      {/* <HeaderDefault
        headerSetting={headerSetting}
        menu={menu}
        navigation={navigation}
      /> */}
      <HeaderFive />
    </>
  );
};

export default Header;
