// 检查定位权限状态
export async function checkLocationPermission(): Promise<"granted" | "denied" | "prompt"> {
  try {
    const result = await navigator.permissions.query({ name: "geolocation" });
    return result.state;
  } catch {
    return "prompt";
  }
}

// 使用浏览器 Geolocation API 判断是否在上海
export async function isShanghaiUser(): Promise<boolean | "denied"> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.log("浏览器不支持定位");
      resolve(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log("定位坐标:", lat, lon);
        
        // 上海的大致经纬度范围
        const isInShanghai = lat >= 30.7 && lat <= 31.5 && lon >= 120.8 && lon <= 122.0;
        console.log("是否在上海:", isInShanghai);
        resolve(isInShanghai);
      },
      (error) => {
        console.log("定位失败:", error.code, error.message);
        if (error.code === error.PERMISSION_DENIED) {
          resolve("denied");
        } else {
          resolve(true);
        }
      },
      { timeout: 10000, maximumAge: 0 }
    );
  });
}

// 重试获取位置
export async function retryLocation(): Promise<boolean> {
  // 先检查权限状态
  const permission = await checkLocationPermission();
  
  if (permission === "denied") {
    // 权限被拒绝，需要用户手动到浏览器设置开启
    return false;
  }
  
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const isInShanghai = lat >= 30.7 && lat <= 31.5 && lon >= 120.8 && lon <= 122.0;
        resolve(isInShanghai);
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          resolve(false);
        } else {
          resolve(true); // 超时等错误默认放行
        }
      },
      { timeout: 10000 }
    );
  });
}
