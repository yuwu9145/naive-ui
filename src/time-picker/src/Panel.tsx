import { h, ref, defineComponent, inject, PropType, computed, VNode } from 'vue'
import { NScrollbar } from '../../scrollbar'
import { NButton } from '../../button'
import { NBaseFocusDetector } from '../../_internal'
import { time } from './utils'
import {
  IsHourDisabled,
  IsMinuteDisabled,
  IsSecondDisabled,
  TimePickerInjection
} from './interface'
import PanelCol, { Item } from './PanelCol'

export default defineComponent({
  name: 'TimePickerPanel',
  props: {
    showHour: {
      type: Boolean,
      default: true
    },
    showMinute: {
      type: Boolean,
      default: true
    },
    showSecond: {
      type: Boolean,
      default: true
    },
    showPeriod: {
      type: Boolean,
      default: true
    },
    isHourInvalid: {
      type: Boolean,
      default: false
    },
    isMinuteInvalid: {
      type: Boolean,
      default: false
    },
    isSecondInvalid: {
      type: Boolean,
      default: false
    },
    isValueInvalid: {
      type: Boolean,
      default: false
    },
    hourValue: {
      type: Number as PropType<number | null>,
      default: null
    },
    minuteValue: {
      type: Number as PropType<number | null>,
      default: null
    },
    secondValue: {
      type: Number as PropType<number | null>,
      default: null
    },
    isHourDisabled: Function as PropType<IsHourDisabled>,
    isMinuteDisabled: Function as PropType<IsMinuteDisabled>,
    isSecondDisabled: Function as PropType<IsSecondDisabled>,
    onHourClick: {
      type: Function as PropType<(value: number) => void>,
      required: true
    },
    onMinuteClick: {
      type: Function as PropType<(value: number) => void>,
      required: true
    },
    onSecondClick: {
      type: Function as PropType<(value: number) => void>,
      required: true
    },
    onNowClick: Function as PropType<() => void>,
    nowText: String,
    confirmText: String,
    transitionDisabled: {
      type: Boolean,
      default: false
    },
    onConfirmClick: Function as PropType<() => void>,
    onFocusIn: Function as PropType<(e: FocusEvent) => void>,
    onFocusOut: Function as PropType<(e: FocusEvent) => void>,
    onFocusDetectorFocus: Function as PropType<() => void>,
    onKeydown: Function as PropType<(e: KeyboardEvent) => void>
  },
  setup (props) {
    const NTimePicker = inject<TimePickerInjection>(
      'NTimePicker'
    ) as TimePickerInjection
    const hoursRef = computed<Item[]>(() =>
      time.hours.map((hour) => {
        const { isHourDisabled } = props
        return {
          value: hour,
          disabled: isHourDisabled ? isHourDisabled(Number(hour)) : false
        }
      })
    )
    const minutesRef = computed<Item[]>(() =>
      time.minutes.map((minute) => {
        const { isMinuteDisabled } = props
        return {
          value: minute,
          disabled: isMinuteDisabled
            ? isMinuteDisabled(Number(minute), props.hourValue)
            : false
        }
      })
    )
    const secondsRef = computed<Item[]>(() =>
      time.seconds.map((second) => {
        const { isSecondDisabled } = props
        return {
          value: second,
          disabled: isSecondDisabled
            ? isSecondDisabled(
              Number(second),
              props.minuteValue,
              props.hourValue
            )
            : false
        }
      })
    )
    return {
      NTimePicker,
      hours: hoursRef,
      minutes: minutesRef,
      seconds: secondsRef,
      hourScrollRef: ref(null),
      minuteScrollRef: ref(null),
      secondScrollRef: ref(null)
    }
  },
  render () {
    return h(
      'div',
      {
        tabindex: 0,
        class: 'n-time-picker-panel',
        onFocusIn: this.onFocusIn,
        onFocusOut: this.onFocusOut,
        onKeydown: this.onKeydown
      },
      [
        <div class="n-time-picker-cols">
          {this.showHour ? (
            <div
              class={[
                'n-time-picker-col',
                {
                  'n-time-picker-col--invalid': this.isHourInvalid,
                  'n-time-picker-col--transition-disabled': this
                    .transitionDisabled
                }
              ]}
            >
              <NScrollbar
                ref="hourScrollRef"
                unstableTheme={this.NTimePicker.mergedTheme.peers.Scrollbar}
                unstableThemeOverrides={
                  this.NTimePicker.mergedTheme.overrides.Scrollbar
                }
              >
                {{
                  default: () => [
                    <PanelCol
                      data={this.hours}
                      activeValue={this.hourValue}
                      onItemClick={this.onHourClick}
                    />,
                    <div class="n-time-picker-col__padding" />
                  ]
                }}
              </NScrollbar>
            </div>
          ) : null}
          {this.showMinute ? (
            <div
              class={[
                'n-time-picker-col',
                {
                  'n-time-picker-col--transition-disabled': this
                    .transitionDisabled,
                  'n-time-picker-col--invalid': this.isMinuteInvalid
                }
              ]}
            >
              <NScrollbar
                ref="minuteScrollRef"
                unstableTheme={this.NTimePicker.mergedTheme.peers.Scrollbar}
                unstableThemeOverrides={
                  this.NTimePicker.mergedTheme.overrides.Scrollbar
                }
              >
                {{
                  default: () => [
                    <PanelCol
                      data={this.minutes}
                      activeValue={this.minuteValue}
                      onItemClick={this.onMinuteClick}
                    />,
                    <div class="n-time-picker-col__padding" />
                  ]
                }}
              </NScrollbar>
            </div>
          ) : null}
          {this.showSecond ? (
            <div
              class={[
                'n-time-picker-col',
                {
                  'n-time-picker-col--invalid': this.isSecondInvalid,
                  'n-time-picker-col--transition-disabled': this
                    .transitionDisabled
                }
              ]}
            >
              <NScrollbar
                ref="secondScrollRef"
                unstableTheme={this.NTimePicker.mergedTheme.peers.Scrollbar}
                unstableThemeOverrides={
                  this.NTimePicker.mergedTheme.overrides.Scrollbar
                }
              >
                {{
                  default: () => [
                    <PanelCol
                      data={this.seconds}
                      activeValue={this.secondValue}
                      onItemClick={this.onSecondClick}
                    />,
                    <div class="n-time-picker-col__padding" />
                  ]
                }}
              </NScrollbar>
            </div>
          ) : null}
        </div>,
        <div class="n-time-picker-actions">
          <NButton
            size="tiny"
            unstableTheme={this.NTimePicker.mergedTheme.peers.Button}
            unstableThemeOverrides={
              this.NTimePicker.mergedTheme.overrides.Button
            }
            onClick={this.onNowClick}
          >
            {{ default: () => this.nowText }}
          </NButton>
          <NButton
            size="tiny"
            type="primary"
            class="n-time-picker-actions__confirm"
            unstableTheme={this.NTimePicker.mergedTheme.peers.Button}
            unstableThemeOverrides={
              this.NTimePicker.mergedTheme.overrides.Button
            }
            disabled={this.isValueInvalid}
            onClick={this.onConfirmClick}
          >
            {{ default: () => this.confirmText }}
          </NButton>
        </div>,
        <NBaseFocusDetector onFocus={this.onFocusDetectorFocus} />
      ] as VNode[]
    )
  }
})