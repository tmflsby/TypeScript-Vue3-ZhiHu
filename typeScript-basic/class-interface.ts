interface Radio {
  switchRadio(trigger: boolean): void
}

interface Battery {
  checkBatteryStatus(): void
}

interface RadioWithBattery extends Radio {
  checkBatteryStatus(): void
}

class Car implements Radio{
  switchRadio(trigger: boolean) {

  }
}

class Cellphone implements RadioWithBattery {
  switchRadio(trigger: boolean) {

  }
  checkBatteryStatus() {

  }
}

// 要实现多个接口，我们只需要中间用 逗号 隔开即可
class Cellphone1 implements Radio, Battery {
  switchRadio() {
  }
  checkBatteryStatus() {

  }
}
