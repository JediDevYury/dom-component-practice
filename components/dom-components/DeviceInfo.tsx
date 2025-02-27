"use dom"

import "@/global.css";
import "./styles/device-info.css";

import {forwardRef, useEffect, useRef} from "react";
import * as Device from "expo-device";
import { DOMImperativeFactory, useDOMImperativeHandle } from "expo/dom";

export interface DialogRef extends DOMImperativeFactory {
  showModal: () => void;
  closeModal: () => void;
}

type DeviceInfoProps = {
  device: typeof Device,
  dom: import('expo/dom').DOMProps,
  onDOMLayout: (size: { width: number; height: number }) => void;
}

const classes = {
  button: 'p-1 px-3 bg-gray-200 rounded-2xl focus:outline-none',
}


function useSize(callback: (size: { width: number; height: number }) => void) {
  useEffect(() => {
    // Observe window size changes
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        callback({ width, height });
      }
    });

    observer.observe(document.body);

    callback({
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    });

    return () => {
      observer.disconnect();
    };
  }, [callback]);
}

export default forwardRef<DialogRef, DeviceInfoProps>(function DeviceInfo({device, onDOMLayout}: DeviceInfoProps, ref) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useSize(onDOMLayout);

  useDOMImperativeHandle(
    ref,
    () => ({
      showModal: () => {
        dialogRef.current?.showModal();
      },
      closeModal: () => {
        dialogRef.current?.close();
      }
    }),
    []
  );

  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-red-200">
      <div className="flex flex-col gap-y-4 bg-red-200">
        <p>Hello,&nbsp; {device.deviceName}</p>
        <button className={classes.button} onClick={() => {
          dialogRef.current?.showModal()
        }}>Device Brand</button>
      </div>
      <dialog autoFocus={false} ref={dialogRef} className="absolute w-full inset-0 bg-red-600 rounded">
        <div className="flex flex-col p-2">
          <p className="p-[20px] flex justify-center text-white">Device brand: {device.brand}</p>
          <form method="dialog">
            <button onClick={() => {
              dialogRef.current?.close()
            }} className={classes.button}>Cancel
            </button>
          </form>
        </div>
      </dialog>
    </div>
  )
})
