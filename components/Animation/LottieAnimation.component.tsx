import { View } from "native-base";
import LottieView from "lottie-react-native";

interface LottieAnimationProps {
  animationVisible: boolean;
  setAnimationVisible: React.Dispatch<React.SetStateAction<boolean>>;
  animationPath: string;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationVisible,
  setAnimationVisible,
  animationPath,
}) => {
  let source = null;

  // Map animation paths to corresponding require statements
  switch (animationPath) {
    case "success":
      source = require("../../assets/success.json");
      break;
    case "decline":
      source = require("../../assets/successRed.json");
      break;
    // Add more cases for different animation paths
    default:
      break;
  }

  return animationVisible && source ? (
    <View position="absolute" zIndex="999" top="25%">
      <LottieView
        autoPlay
        loop={false}
        style={{
          width: 200,
          height: 200,
        }}
        source={source}
        onAnimationFinish={() => setAnimationVisible(false)}
      />
    </View>
  ) : null;
};

export default LottieAnimation;
